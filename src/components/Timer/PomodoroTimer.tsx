import { useEffect, useState } from "react";

interface Time {
    focusTime: number,
    breakTime: number,
}

interface TimerSetting {
    changeTimer: boolean,
    toggleTimer: boolean,
    timeOut: boolean
}

export default function PomodoroTimer({ submitTask }: { submitTask: (value: number) => void }) {
    const [initialTime, setInitialTime] = useState<Time>({ focusTime: 3, breakTime: 3 });
    const [timeLeft, setTimeLeft] = useState<Time>({ focusTime: initialTime.focusTime, breakTime: initialTime.breakTime });
    const [timerSetting, setTimerSetting] = useState<TimerSetting>({ changeTimer: false, toggleTimer: false, timeOut: false });

    useEffect(() => {
        setTimeLeft({ focusTime: initialTime.focusTime, breakTime: initialTime.breakTime });
    }, [initialTime]);

    useEffect(() => {
        let intervalId: number;

        if (timerSetting.toggleTimer) {
            if (!timerSetting.changeTimer) {
                setTimeLeft(prevTimeLeft => ({ ...prevTimeLeft, breakTime: initialTime.breakTime }));
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
                setTimeLeft(prevTimeLeft => ({ ...prevTimeLeft, focusTime: initialTime.focusTime }));
                intervalId = setInterval(() => {
                    setTimeLeft(prevTimeLeft => {
                        const currentTime = prevTimeLeft.breakTime;
                        if (currentTime === 0) {
                            setTimerSetting({...timerSetting, changeTimer: !timerSetting.changeTimer, toggleTimer: false });
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
        if(timerSetting.timeOut) submitTask(initialTime.focusTime);
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