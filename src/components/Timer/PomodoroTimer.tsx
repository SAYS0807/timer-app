import { useContext, useEffect, useState } from "react";
import { TimerContext, TimerDispatchContext } from "./Context";

export default function PomodoroTimer({ time }: { time: number }) {
    const timer = useContext(TimerContext);
    const dispatch = useContext(TimerDispatchContext);

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isBreakTime, setIsBreakTime] = useState(false);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        if (isBreakTime) {
            dispatch({ type: 'pomo_change_mode_break' });
        } else {
            dispatch({ type: 'pomo_change_mode_focus' });
        }
    }, [isBreakTime, timer.isBreakTime]);

    function handleClick() {
        setIsBreakTime(!isBreakTime);
    }

    return (
        <div className="relative flex flex-col justify-center text-center text-white font-thin w-full h-full">
            <p className="absolute -translate-x-1/2 -translate-y-1/2 top-14 md:top-6 w-full left-1/2 text-2xl mb-1">{!timer.isBreakTime ? 'Focus Time' : 'Break Time'}</p>
            <p className="text-center text-5xl font-rubik tracking-wider w-full">
                {(Math.floor(time % 3600 / 60)).toString().padStart(2, '0')}:{(Math.floor(time % 60)).toString().padStart(2, '0')}
            </p>
            <button onClick={handleClick} className="absolute bottom-9 -translate-x-1/2 w-1/2 left-1/2 text-lg border-2 rounded-md md:bottom-2 md:w-3/5">{timer.isBreakTime ? 'Change to focus time' : 'Change to break time'}</button>
        </div>
    );
}