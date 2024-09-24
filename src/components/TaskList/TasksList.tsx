import { useContext, useEffect, useState } from "react";
import { TasksDataContext, TasksDataDispatchContext } from "../Timer/Context";

export default function TasksList() {
    const tasksData = useContext(TasksDataContext);
    const dispatch = useContext(TasksDataDispatchContext);

    const [tasksList, setTasksList] = useState(tasksData);
    const [id, setId] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);

    // useEffect(() => {
    //     if (isFirstRender) {
    //         setIsFirstRender(false);
    //         return;
    //     } else {
    //         dispatch({ type: 'delete', id: id });
    //     }
    // }, [tasksList]);

    const deleteTask = (id: number) => {
        dispatch({ type: 'delete', id: id });
    }

    return (
        <div className="mx-auto mt-5 w-full h-full md:mt-0 md:w-4/5 md:bg-gray-50 md:drop-shadow-md md:rounded-md md:p-4">
            <h2 className="text-center text-3xl font-thin mb-3">Tasks List</h2>
            <ol className="w-full">
                {tasksData.map(task => (
                    <li className="flex mb-5 gap-x-3 content-center justify-center" key={task.id}>
                        <span className="w-3/6 md:text-2xl">{task.taskTitle}</span>
                        <span className="md:text-2xl">{(Math.floor(task.timeSpent / 3600)).toString().padStart(2, '0')}:{(Math.floor(task.timeSpent % 3600 / 60)).toString().padStart(2, '0')}:{(Math.floor(task.timeSpent % 60)).toString().padStart(2, '0')}</span>
                        <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-3 rounded-md">Delete</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}