import { useState, useEffect } from "react"

function App() {
  interface Task {
    id: number,
    title: string,
    spentTime: number,
  }

  const [title, setTitle] = useState('');
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [count, setCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string[]>([]);

  useEffect(() => {
    let interval: number;
    if (isTimerRunning) {
      interval = setInterval(() => {
        //If timer is active, then add one seconds.
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      //clean up function
      clearInterval(interval);
    }
  }, [isTimerRunning]);

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTime(0);
  }

  const handleTextChange = (input: string) => {
    setTitle(input);
  }

  const handleSubmit = () => {
    let curError: string[] = [];

    if (title === '') curError.push('Please fill the task name!!');
    if (title.length > 20) curError.push('The task name must to be under 20 characters.')
    if (time <= 0) curError.push('You need to spend at least one seconds on this task.');

    if (curError.length > 0) {
      setErrorMsg(curError);
      return;
    }

    submitTime();
  }

  const submitTime = () => {
    setErrorMsg([]);
    const newTask: Task = {
      id: count,
      title: title,
      spentTime: time,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setCount(prevCount => prevCount + 1);
    setIsTimerRunning(false);
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
          <h2 className="text-2xl">Task Name</h2>
          <input type="text" onChange={(e) => handleTextChange(e.target.value)} className="w-full border-2 border-gray-600 rounded-md h-9 text-xl px-4" value={title} placeholder="Write the task name here..."></input>
          <p className="text-center text-2xl mb-5">{(Math.floor(time / 3600)).toString().padStart(2, '0')} : {(Math.floor(time % 3600 / 60)).toString().padStart(2, '0')} : {(Math.floor(time % 60)).toString().padStart(2, '0')}</p>
          <div className="w-full md:flex md:justify-between mb-11">
            <button onClick={handleTimerToggle} className={`text-white rounded-md p-3 w-full mb-3 md:mb-0 md:w-2/5 ${isTimerRunning ? "bg-yellow-500" : "bg-cyan-500"}`}>
              {isTimerRunning ? 'Stop' : 'Start'}
            </button>
            <button onClick={resetTimer} className="bg-red-500 text-white rounded-md p-3 mb-3 w-full md:mb-0 md:w-2/5">
              Reset
            </button>
          </div>
          <div className="w-full mx-auto">
            <p className="text-center text-xl mb-3">You've done your task?<br></br>Let's submit!!</p>
            <button onClick={handleSubmit} className={`${time <= 0 ? "bg-gray-500" : "bg-green-400 cursor-auto"} text-white rounded-md p-3 w-full md:w-full`}>
              Submit
            </button>
            <div className={`${errorMsg.length === 0 ? "hidden" : "block"} mt-3 mb-3`}>
              <p className="text-red-500 text-center text-lg mb-1">Woops! Something is wrong.</p>
              <ol className="ml-6 list-disc">
                {errorMsg.map((msg, index) => (
                  <li key={index} className="text-red-500">{msg}</li>
                ))}
              </ol>
            </div>
          </div>
          <h2 className="mt-5">Completed Tasks</h2>
          <ul className="mt-2">
            {tasks.map(task => (
              <li key={task.id} className="mb-3">
                <p className="text-xl">{task.title}</p>
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
