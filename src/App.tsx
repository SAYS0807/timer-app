import { useState, useEffect } from "react"

function App() {
  interface Task {
    id: number,
    title: string,
    spentTime: number,
  }

  const [title, setTitle] = useState('');
  const [time, setTime] = useState(0);
  const [isTimerRunnig, setisTimerRunnig] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isTimerRunnig) {
      interval = setInterval(() => {
        //If timer is active, then add one seconds.
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      //clean up function
      clearInterval(interval);
    }
  }, [isTimerRunnig]);

  const handleTimerToggle = () => {
    setisTimerRunnig(!isTimerRunnig);
  };

  const resetTimer = () => {
    setisTimerRunnig(false);
    setTime(0);
  }

  const handleTextChange = (input: string) => {
    setTitle(input);
  }

  const submitTime = () => {
    const newTask: Task = {
      id: count,
      title: title,
      spentTime: time,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setCount(prevCount => prevCount + 1);
    setisTimerRunnig(false);
    setTime(0);
  }

  const deleteTask = (id: number) => {
    const newTasks: Task[] = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <>
      <div className="mt-5 mx-auto md:w-3/4">
        <h1 className="text-3xl text-blue-400 underline text-center font-bold">Timer</h1>
        <div className="mx-auto w-3/5 mt-5">
          <input type="text" onChange={(e) => handleTextChange(e.target.value)} className="w-full border-2 border-gray-600 rounded-md h-9 text-xl px-4" value={title}></input>
          <p className="text-center text-2xl mb-5">{(Math.floor(time / 3600)).toString().padStart(2, '0')} : {(Math.floor(time % 3600 / 60)).toString().padStart(2, '0')} : {(Math.floor(time % 60)).toString().padStart(2, '0')}</p>
          <div className="w-full md:flex md:justify-between">
            <button onClick={handleTimerToggle} className={`text-white rounded-md p-3 w-full mb-3 md:mb-0 md:w-5/12 ${isTimerRunnig ? "bg-yellow-500" : "bg-cyan-500"}`}>
              {isTimerRunnig ? 'Stop' : 'Start'}
            </button>
            <button onClick={resetTimer} className="bg-red-500 text-white rounded-md p-3 mb-3 w-full md:w-5/12">
              Reset
            </button>
            <button onClick={submitTime} className="bg-green-400 text-white rounded-md p-3 w-full md:w-5/12">
              Submit
            </button>
          </div>
          <h2>Completed Tasks</h2>
          <ul className="mt-5">
            {tasks.map(task => (
              <li key={task.id} className="mb-3">
                <p>{task.title}</p>
                <div className="flex justify-between">
                  <p className="text-2xl">
                    {(Math.floor(task.spentTime / 3600)).toString().padStart(2, "0")} : {(Math.floor(task.spentTime % 3600 / 60)).toString().padStart(2, "0")} : {(Math.floor(task.spentTime % 60)).toString().padStart(2, "0")}
                  </p>
                  <div className="flex justify-start">
                    <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
