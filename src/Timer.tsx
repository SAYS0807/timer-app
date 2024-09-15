import { v4 as uuidv4, V4Options } from 'uuid';
import { useState, useEffect } from "react";
import TitleInput from "./TitleInput";
import TimerUI from "./TimerUI";
import ButtonContainer from "./ButtonContainer";
import SubmitContainer from './SubmitContainer';
import TaskList from './TasksList';

interface TaskData {
    id: string,
    taskName: string,
    timeSpent: number,
}

export default function Timer() {

    const [time, setTime] = useState(0);
    const [title, setTitle] = useState('');
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [tasksData, setTasksData] = useState<TaskData[]>([]);

    useEffect(() => {
        let intervalID: number;

        if (isTimerRunning) {
            intervalID = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalID);
        }
    }, [isTimerRunning]);

    const handleTextChange = (input: string) => {
        setTitle(input);
    };

    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    const resetTimer = () => {
        setIsTimerRunning(false);
        setTime(0);
    };

    const submitData = () => {
        const newTask: TaskData = {
            id: uuidv4(),
            taskName: title,
            timeSpent: time,
        };

        setIsTimerRunning(false);
        setTitle('');
        setTime(0);
        setTasksData([...tasksData, newTask]);
    };

    const deleteData = (id: string) => {
        const newTasksData: TaskData[] = tasksData.filter((task) => task.id !== id);

        setIsTimerRunning(false);
        setTitle('');
        setTime(0);
        setTasksData(newTasksData);
    };



    return (
        <div className="mt-5 mx-auto md:w-3/4">
            <h1 className="text-3xl text-blue-400 underline text-center font-bold">Timer</h1>
            <div className="mx-auto w-3/5 mt-5">
                <h2 className="text-2xl">Task Name</h2>
                <TitleInput onChange={handleTextChange} title={title} />
                <TimerUI time={time} />
                <ButtonContainer
                    handleStartStopClick={toggleTimer}
                    handleResetClick={resetTimer}
                    isTimerRunning={isTimerRunning}
                />
                <SubmitContainer
                    submitData={submitData}
                    time={time}
                    title={title}
                />
                <TaskList
                    tasksData={tasksData}
                    handleDelete={(id) => deleteData(id)}
                />
            </div>
        </div>
    );
}