import { useState, useEffect, useContext, ReactNode } from "react";
import { TaskDataContext, TaskDataDispatchContext, TimerContext } from "../Timer/Context";

export default function TaskInput() {
    const taskData = useContext(TaskDataContext);
    const dispatch = useContext(TaskDataDispatchContext);

    const timer = useContext(TimerContext);

    const [taskTitle, setTaskTitle] = useState(taskData.taskTitle);

    useEffect(() => {
        dispatch({ type: 'update_task_title', input: taskTitle });
    }, [taskTitle]);

    useEffect(() => {
        setTaskTitle(taskData.taskTitle);
    }, [taskData.taskTitle]);

    function changeTaskTitle(value: string) {
        setTaskTitle(value);
    }

    return (
        <div className="mx-auto w-full py-8">
            <h2 className="text-2xl text-center font-thin mb-2">Task Title</h2>
            <input onChange={(e) => changeTaskTitle(e.target.value)} type="text" className='duration-150 ease-in block mx-auto w-full bg-white border-dashed border-2 text-center text-xl border-slate-500 rounded-md focus:border-opacity-25 placeholder:text-lg md:w-3/4 h-9' placeholder="Enter the task name here..." value={taskTitle}></input>
        </div>
    );
}


