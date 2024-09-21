import { useState, useEffect } from "react";
import TitleInput from "./TitleInput";
import TimerUI from "./TimerUI";
import ButtonContainer from './ButtonContainer';
import SubmitContainer from './Submit/SubmitContainer';

interface TimerProps {
    title: string,
    controlTaskName: (action: string, newTitle: string) => void,
    controlTimer: (action: string) => void,
    submitTaskData: (value: number) => void,
}

export interface PomoInitial {
    focusTime: number,
    breakTime: number
}

export default function Timer({ title, controlTaskName, controlTimer, submitTaskData }: TimerProps) {

    const [time, setTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [pomoInitial, setPomoInital] = useState<PomoInitial>({focusTime: 60, breakTime: 5 * 60});
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        isTimerRunning ? controlTimer('start') : controlTimer('pause');
    }, [isTimerRunning]);

    useEffect(() => {
        let intervalId: number;
        if (isTimerRunning) {
            const startTime = Date.now();
            intervalId = setInterval(() => {
                const currentTime = Date.now();
                const elapsedTime = totalTime + ((currentTime - startTime) / 1000);
                setTotalTime(elapsedTime);
                setTime(elapsedTime);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isTimerRunning]);

    const handleTextChange = (input: string) => {
        controlTaskName('update', input);
    };

    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    const resetTimer = () => {
        setIsTimerRunning(false);
        controlTimer('reset');
    };

    const stopTimerSubmit = () => {
        setIsTimerRunning(false);
        submitTaskData(time);
    }

    const submitPomodoroTask = (initialTime: number) => {
        submitTaskData(initialTime);
    }



    return (
        <div className="mx-auto md:w-4/5 md:bg-gray-50 md:drop-shadow-md md:rounded-md md:p-8 md:min-h-96">
            <div className="mx-auto w-full mt-5">
                <h2 className="text-2xl">Task Name</h2>
                <TitleInput onChange={handleTextChange} title={title} />
                <TimerUI time={time} resetTimer={resetTimer} pomoInitial={pomoInitial} submitPomodoroTask={(value) => submitPomodoroTask(value)} />
                <ButtonContainer
                    handleStartStopClick={toggleTimer}
                    handleResetClick={resetTimer}
                    isTimerRunning={isTimerRunning}
                />
                <SubmitContainer
                    submitTaskData={stopTimerSubmit}
                    time={time}
                    title={title}
                />
            </div>
        </div>
    );
}