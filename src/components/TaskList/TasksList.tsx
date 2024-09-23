import { useContext } from "react";
import { TasksDataContext } from "../Timer/Context";

export default function TasksList() {
    const tasksData = useContext(TasksDataContext);

    return (
        <div className="mx-auto w-full h-full md:w-4/5 md:bg-gray-50 md:drop-shadow-md md:rounded-md md:p-4">
            <h2 className="text-center text-3xl font-thin mb-3">Tasks List</h2>
            <ol className="w-full">
                {tasksData.map(task => (
                    <li className="flex mb-5 gap-x-3 content-center justify-center" key={task.id}>
                        <span className="w-3/6 md:text-2xl">{task.taskTitle}</span>
                        <span className="md:text-2xl">{(Math.floor(task.timeSpent / 3600)).toString().padStart(2, '0')}:{(Math.floor(task.timeSpent % 3600 / 60)).toString().padStart(2, '0')}:{(Math.floor(task.timeSpent % 60)).toString().padStart(2, '0')}</span>
                        <button className="bg-violet-500 text-white px-3 rounded-md">Edit</button>
                        <button className="bg-red-500 text-white px-3 rounded-md">Delete</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}