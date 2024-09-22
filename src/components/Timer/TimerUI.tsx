import { useContext, useEffect, useReducer, useState } from "react";
import { TimerContext, TimerDispatchContext } from "./Context";
import NormalTimer from "./NormalTimer";
import PomodoroTimer from "./PomodoroTimer";

export default function TimerUI2() {
    const timer = useContext(TimerContext);
    const dispatch = useContext(TimerDispatchContext);
    const [totalTime, setTotalTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(timer.pomoFocusTime);


    useEffect(() => {
        let intervalId: number;
        if (timer.isRunning) {
            const startTime = Date.now();
            if (timer.mode === 'normal') {
                intervalId = setInterval(() => {
                    const currentTime = Date.now();
                    const elapsedTime = totalTime + ((currentTime - startTime) / 1000);
                    setTotalTime(elapsedTime);
                    dispatch({ type: 'running', time: elapsedTime });
                }, 1000);
            } else {
                intervalId = setInterval(() => {
                    const currentTime = Date.now();
                    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
                    const newRemainingTime = Math.max(0, remainingTime - elapsedTime);

                    setRemainingTime(newRemainingTime);
                    dispatch({ type: 'running', time: newRemainingTime });

                    if (newRemainingTime === 0) {
                        clearInterval(intervalId);
                        if (timer.isBreakTime) {
                            setRemainingTime(timer.pomoFocusTime);
                            dispatch({ type: 'pomo_stop_break' });
                        } else {
                            setRemainingTime(timer.pomoBreakTime);
                            dispatch({ type: 'pomo_stop_focus' });
                        }
                    }
                }, 1000);
            }
        }

        return () => clearInterval(intervalId);
    }, [timer.isRunning]);

    useEffect(() => {
        if (timer.mode === 'normal') {
            setTotalTime(0);
        } else {
            setRemainingTime(!timer.isBreakTime ? timer.pomoFocusTime : timer.pomoBreakTime);
        }
    }, [timer.isReset]);

    useEffect(() => {
        setTotalTime(0);
        setRemainingTime(timer.pomoFocusTime);
        if (timer.mode === 'normal') {
            dispatch({ type: 'reset', time: 0 });
        } else {
            dispatch({ type: 'pomo_stop_break' })
        }
    }, [timer.mode])

    function changeTimerMode() {
        if (timer.mode === 'normal') {
            dispatch({ type: 'change_mode_pomo' });
        } else {
            dispatch({ type: 'change_mode_normal' });
        }
    }

    return (
        <>
            <p className="text-center text-3xl font-thin">Mode: {timer.mode === 'normal' ? 'Normal Timer' : 'Pomodoro Timer'}</p>
            <div className={`relative rounded-full w-56 h-56 flex items-center content-center mx-auto my-5 bg-gradient-to-r ${timer.mode === 'normal' ? 'from-blue-500 to-cyan-400' : 'from-red-500 to-orange-400'}`}>
                {timer.mode === 'normal' ? <NormalTimer time={timer.time} /> : <PomodoroTimer time={timer.time} />}
                <button onClick={changeTimerMode} className={`duration-150 absolute -right-4 bottom-0 text-base text-white w-20 h-20 rounded-full hover:scale-110 bg-gradient-to-r ${timer.mode === 'pomo' ? "from-blue-500 to-cyan-400" : "from-red-500 to-orange-400"}`}>Change</button>
            </div>
        </>
    );
}
