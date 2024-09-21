import { useState, useEffect } from "react";
import NormalTimer from "./NormalTimer";
import PomodoroTimer from "./PomodoroTimer";
import ButtonContainer from "./ButtonContainer";
import SubmitContainer from "./Submit/SubmitContainer";
import { PomoInitial } from "./Timer";

interface TiemrUIProps {
    time: number,
    pomoInitial: PomoInitial,
    resetTimer: () => void,
    submitPomodoroTask: (initialTime: number) => void;
}

export default function TimerUI({ time, pomoInitial, resetTimer, submitPomodoroTask }: TiemrUIProps) {
    const fixTime = time;
    const [togglePomo, setTogglePomo] = useState(false);

    const changeTimerFunc = () => {
        setTogglePomo(!togglePomo);
    }

    return (
        <>
            <div className={`relative rounded-full w-56 h-56 felx content-center mx-auto my-5 bg-gradient-to-r ${togglePomo ? "from-red-500 to-orange-400" : "from-blue-500 to-cyan-400"}`}>
                {togglePomo ? (<PomodoroTimer time={pomoInitial} submitTask={(value) => submitPomodoroTask(value)} />) : (<NormalTimer time={fixTime} resetTimer={resetTimer} />)}
                <button onClick={changeTimerFunc} className={`duration-150 absolute -right-4 bottom-0 text-base text-white w-20 h-20 rounded-full hover:scale-110 bg-gradient-to-r ${togglePomo ? "from-blue-500 to-cyan-400" : "from-red-500 to-orange-400"}`}>Change</button>
            </div>
        </>
    );
}