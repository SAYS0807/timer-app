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
  }
  return (
    <>
      <h1 className="text-3xl text-blue-400 underline text-center">Timer</h1>
      <div className="mx-auto w-3/5 mt-10">
        <p className="text-center text-2xl mb-5">{(Math.floor(time / 60)).toString().padStart(2, '0')} : {(Math.floor(time % 60)).toString().padStart(2, '0')}</p>
        <button onClick={handleTimerToggle} className="bg-cyan-400 text-white rounded-md p-3 w-full">
          {isTimerRunnig ? 'Stop' : 'Start'}
        </button>
      </div>
    </>
  )
}

export default App
