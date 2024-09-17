import { TaskDataType } from "../../App";

interface TasksList {
    tasksData: TaskDataType[],
    deleteTaskData: (id: number) => void,
}

export default function TaskList({ tasksData, deleteTaskData }: TasksList) {

    return (
        <>
            <div className="bg-gray-50 h-full rounded-md shadow-md md:w-4/5 md:mx-auto md:p-8">
                <h2 className="text-2xl">Completed Tasks</h2>
                <ul className="mt-2">
                    {tasksData.length === 0 && <p>You haven't done any tasks yet...</p>}
                    {tasksData.length !== 0 && tasksData.map((task: TaskDataType) => (
                        <li key={task.id} className="mb-3">
                            <p className="text-xl">{task.title}</p>
                            <div className="flex justify-between items-center h-8">
                                <p className="text-2xl tabular-nums">
                                    {(Math.floor(task.timeSpent / 3600)).toString().padStart(2, "0")} : {(Math.floor(task.timeSpent % 3600 / 60)).toString().padStart(2, "0")} : {(Math.floor(task.timeSpent % 60)).toString().padStart(2, "0")}
                                </p>
                                <button onClick={() => deleteTaskData(task.id)} className="bg-red-500 text-white h-full px-4 rounded-md">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}