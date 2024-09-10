import { useState, useEffect } from "react"

function App() {
  const [time, setTime] = useState(0);
  const [isTimerRunnig, setisTimerRunnig] = useState(false);

  useEffect(() => {
    let interval;
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
  return (
    <div className="mt-5 mx-auto md:w-3/4">
      <h1 className="text-3xl text-blue-400 underline text-center font-bold">Timer</h1>
      <div className="mx-auto w-3/5 mt-5">
        <p className="text-center text-2xl mb-5">{(Math.floor(time / 3600)).toString().padStart(2, '0')} : {(Math.floor(time % 3600 / 60)).toString().padStart(2, '0')} : {(Math.floor(time % 60)).toString().padStart(2, '0')}</p>
        <div className="w-full md:flex md:justify-between">
          <button onClick={handleTimerToggle} className={`text-white rounded-md p-3 w-full mb-3 md:mb-0 md:w-5/12 ${isTimerRunnig ? "bg-yellows-500" : "bg-cyan-500"}`}>
            {isTimerRunnig ? 'Stop' : 'Start'}
          </button>
          <button onClick={resetTimer} className="bg-red-500 text-white rounded-md p-3 w-full md:w-5/12">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
