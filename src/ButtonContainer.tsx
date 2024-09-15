import Button from "./button"

interface ButtonContainerProps {
    handleStartStopClick: React.MouseEventHandler<HTMLButtonElement>,
    handleResetClick: React.MouseEventHandler<HTMLButtonElement>,
    isTimerRunning: boolean,
}

export default function ButtonContainer({ handleStartStopClick, handleResetClick, isTimerRunning }: ButtonContainerProps) {
    return (
        <div className="w-full md:flex md:justify-between mb-11">
            <Button onClick={handleStartStopClick} className={`${isTimerRunning ? "bg-yellow-500" : "bg-cyan-500"}`}>
                {isTimerRunning ? "Stop" : "Start"}
            </Button>
            <Button onClick={handleResetClick} className="bg-red-500">
                Reset
            </Button>
        </div>
    );
}