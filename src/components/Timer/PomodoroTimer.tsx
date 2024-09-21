import { useEffect, useState } from "react";
import { PomoInitial } from "./Timer";

interface Time {
    focusTime: number,
    breakTime: number,
}

interface TimerSetting {
    changeTimer: boolean,
    toggleTimer: boolean,
    timeOut: boolean
}

export default function PomodoroTimer({ time, submitTask }: { time: PomoInitial, submitTask: (value: number) => void }) {
    const [timeLeft, setTimeLeft] = useState<Time>({ focusTime: time.focusTime, breakTime: time.breakTime });
    const [timerSetting, setTimerSetting] = useState<TimerSetting>({ changeTimer: false, toggleTimer: false, timeOut: false });

    useEffect(() => {
        setTimeLeft({ focusTime: time.focusTime, breakTime: time.breakTime });
    }, [time]);

    useEffect(() => {
        let intervalId: number;

        if (timerSetting.toggleTimer) {
            if (!timerSetting.changeTimer) {
                setTimeLeft(prevTimeLeft => ({ ...prevTimeLeft, breakTime: time.breakTime }));
                intervalId = setInterval(() => {
                    setTimeLeft(prevTimeLeft => {
                        const currentTime = prevTimeLeft.focusTime;
                        if (currentTime === 0) {
                            setTimerSetting({ changeTimer: !timerSetting.changeTimer, toggleTimer: false, timeOut: true });
                            return { ...prevTimeLeft, focusTime: 0 };
                        }
                        return { ...prevTimeLeft, focusTime: prevTimeLeft.focusTime - 1 };
                    })
                }, 1000);
            } else {
                setTimeLeft(prevTimeLeft => ({ ...prevTimeLeft, focusTime: time.focusTime }));
                intervalId = setInterval(() => {
                    setTimeLeft(prevTimeLeft => {
                        const currentTime = prevTimeLeft.breakTime;
                        if (currentTime === 0) {
                            setTimerSetting({ ...timerSetting, changeTimer: !timerSetting.changeTimer, toggleTimer: false });
                            return { ...prevTimeLeft, breakTime: 0 };
                        }
                        return { ...prevTimeLeft, breakTime: prevTimeLeft.breakTime - 1 };
                    })
                }, 1000);
            }
        }

        return (() => {
            clearInterval(intervalId);
        })
    }, [timerSetting]);

    useEffect(() => {
        if (timerSetting.timeOut) submitTask(time.focusTime);
    }, [timerSetting.timeOut]);

    const toggleTimer = () => {
        setTimerSetting({ ...timerSetting, toggleTimer: !timerSetting.toggleTimer, timeOut: false });
    }

    return (
        <div onClick={toggleTimer} className="flex flex-col content-center w-full text-center text-4xl text-white">
            <p>{`${Math.floor(timeLeft.focusTime / 60).toString().padStart(2, "0")} : ${(timeLeft.focusTime % 60).toString().padStart(2, "0")}`}</p>
            <div className="w-10/12 h-0.5 bg-white mx-auto my-3"></div>
            <p className="text-3xl">{`${Math.floor(timeLeft.breakTime / 60).toString().padStart(2, "0")} : ${(timeLeft.breakTime % 60).toString().padStart(2, "0")}`}</p>

        </div>
    );
}