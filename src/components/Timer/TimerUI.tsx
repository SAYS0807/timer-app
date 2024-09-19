import { useState, useEffect } from "react";
import NormalTimer from "./NormalTimer";
import PomodoroTimer from "./PomodoroTimer";

export default function TimerUI({ time }: { time: number }) {
    const fixTime = time;
    const [togglePomo, setTogglePomo] = useState(false);

    // useEffect(() => {
    //     if (togglePomo) {

    //     }
    // })


    const changeTimerFunc = () => {
        setTogglePomo(!togglePomo);
    }

    return (
        <div className={`relative rounded-full w-56 h-56 felx content-center mx-auto my-5 bg-gradient-to-r ${togglePomo ? "from-red-500 to-orange-400" : "from-blue-500 to-cyan-400"}`}>
            {/* <NormalTimer time={fixTime} /> */}
            <PomodoroTimer />
            <button onClick={changeTimerFunc} className={`duration-150 absolute -right-4 bottom-0 text-base text-white w-20 h-20 rounded-full hover:scale-110 bg-gradient-to-r ${togglePomo ? "from-blue-500 to-cyan-400" : "from-red-500 to-orange-400"}`}>Change</button>
        </div>
    );
}