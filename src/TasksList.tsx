interface TaskData {
    id: string,
    taskName: string,
    timeSpent: number,
}

interface TasksList {
    tasksData: TaskData[],
    handleDelete: (id: string) => void,
}

export default function TaskList({ tasksData, handleDelete }: TasksList) {

    return (
        <>
            <h2 className="mt-5">Completed Tasks</h2>
            <ul className="mt-2">
                {tasksData.map((task:TaskData) => (
                    <li key={task.id} className="mb-3">
                        <p>{task.id}</p>
                        <p className="text-xl">{task.taskName}</p>
                        <div className="flex justify-between">
                            <p className="text-2xl">
                                {(Math.floor(task.timeSpent / 3600)).toString().padStart(2, "0")} : {(Math.floor(task.timeSpent % 3600 / 60)).toString().padStart(2, "0")} : {(Math.floor(task.timeSpent % 60)).toString().padStart(2, "0")}
                            </p>
                            <div className="flex justify-start">
                                <button onClick={() => handleDelete(task.id)} className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}