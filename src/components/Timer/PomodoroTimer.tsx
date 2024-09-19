import { useEffect, useState } from "react";

interface Time {
    focusTime: number,
    breakTime: number,
}

interface TimerSetting {
    changeTimer: boolean,
    timeOut: boolean,
    toggleTimer: boolean
}

export default function PomodoroTimer({ }) {
    const [timeLeft, setTimeLeft] = useState<Time>({ focusTime: 5, breakTime: 5 * 60 });
    // const [breakTime, setBreakTime] = useState(5 * 60);
    const [timerSetting, setTimerSetting] = useState<TimerSetting>({ changeTimer: false, timeOut: false, toggleTimer: false });

    useEffect(() => {
        let intervalId:number ;

        if (timerSetting.toggleTimer) {
            if (!timerSetting.changeTimer) {
                intervalId = setInterval(() => {
                    setTimeLeft(prevTimeLeft => {
                        const currentTime = prevTimeLeft.focusTime;
                        if (currentTime === 0) {
                            setTimerSetting({ ...timerSetting, changeTimer: !timerSetting.changeTimer, timeOut: !timerSetting.timeOut });
                            return { ...prevTimeLeft, focusTime: 0 };
                        }
                        return { ...prevTimeLeft, focusTime: prevTimeLeft.focusTime - 1 };
                    })
                }, 1000);
            } else {
                intervalId = setInterval(() => {
                    setTimeLeft(prevTimeLeft => {
                        const currentTime = prevTimeLeft.breakTime;
                        if (currentTime === 0) {
                            setTimerSetting({ ...timerSetting, changeTimer: !timerSetting.changeTimer, timeOut: !timerSetting.timeOut });
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

    const toggleTimer = () => {
        console.log('hello');
        setTimerSetting({ ...timerSetting, toggleTimer: !timerSetting.toggleTimer });
    }

    return (
        <div onClick={toggleTimer} className="flex flex-col content-center w-full text-center text-4xl text-white">
            <p>{`${Math.floor(timeLeft.focusTime / 60).toString().padStart(2, "0")} : ${(timeLeft.focusTime % 60).toString().padStart(2, "0")}`}</p>
            <div className="w-10/12 h-0.5 bg-white mx-auto my-3"></div>
            <p className="text-3xl">{`${Math.floor(timeLeft.breakTime / 60).toString().padStart(2, "0")} : ${(timeLeft.breakTime % 60).toString().padStart(2, "0")}`}</p>
        </div>
    );
}