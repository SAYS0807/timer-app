import { useContext } from "react";
import { TimerContext } from "./Context";

export default function PomodoroTimer({ time }: { time: number }) {
    const timer = useContext(TimerContext);
    return (
        <div className="relative flex flex-col justify-center text-center text-white font-thin w-full h-full">
            <p className="absolute -translate-x-1/2 -translate-y-1/2 top-16 w-full left-1/2 text-2xl mb-1">{!timer.isBreakTime ? 'Focus Time' : 'Break Time'}</p>
            <p className="text-center text-5xl font-rubik tracking-wider w-full">
                {(Math.floor(time % 3600 / 60)).toString().padStart(2, '0')}:{(Math.floor(time % 60)).toString().padStart(2, '0')}
            </p>
        </div>
    );
}