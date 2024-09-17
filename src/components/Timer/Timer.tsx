import { useState, useEffect } from "react";
import TitleInput from "./TitleInput";
import TimerUI from "./TimerUI";
import ButtonContainer from './ButtonContainer';
import SubmitContainer from './Submit/SubmitContainer';


interface TaskData {
    id: string,
    taskName: string,
    timeSpent: number,
}

interface TimerProps {
    time: number,
    title: string,
    controlTaskName: (action: string, newTitle: string) => void,
    controlTimer: (action: string) => void,
    submitTaskData: () => void,
}

export default function Timer({ time, title, controlTaskName, controlTimer, submitTaskData }: TimerProps) {

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    
    // const fetchAPI = async () => {
    //     const response = await axios.get("http://localhost:8080/api");
    //     console.log(response.data.names);
    // }

    // useEffect(() => {
    //     fetchAPI();
    // }, []);

    useEffect(() => {
        let intervalID: number;

        if (isTimerRunning) {
            intervalID = setInterval(() => {
                controlTimer('start');
            }, 1000);
        }

        return () => {
            clearInterval(intervalID);
        }
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
        submitTaskData();
    }

    return (
        <div className="mx-auto md:w-4/5 md:bg-gray-50 md:drop-shadow-md md:rounded-md md:p-8">
            <div className="mx-auto w-full mt-5">
                <h2 className="text-2xl">Task Name</h2>
                <TitleInput onChange={handleTextChange} title={title} />
                <TimerUI time={time} />
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