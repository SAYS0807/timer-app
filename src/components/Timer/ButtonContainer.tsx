import { ButtonHTMLAttributes, ReactNode, useContext } from "react";
import { TimerContext, TimerDispatchContext } from "./Context";

export default function ButtonContainer() {
    const timer = useContext(TimerContext);
    const dispatch = useContext(TimerDispatchContext);

    function judgeResetType() {
        if (timer.mode === 'normal') {
            dispatch({ type: 'reset', time: 0 });
        } else {
            dispatch({ type: 'reset', time: !timer.isBreakTime ? timer.pomoFocusTime : timer.pomoBreakTime });
        }
    }

    return (
        <div className="w-full, mb-5, md:flex md:justify-between">
            <Button onClick={() => dispatch({ type: 'toggle' })} className={timer.isRunning ? 'bg-orange-500' : 'bg-cyan-500'}>
                {timer.isRunning ? 'Stop' : 'Start'}
            </Button>
            <Button onClick={judgeResetType} className="bg-red-500">
                Reset
            </Button>
        </div>
    );
}

function Button({ children, className, onClick }: { children: ReactNode, className: string, onClick: () => void }) {
    return (
        <button onClick={onClick} className={`text-white rounded-md p-3 mb-3 w-full md:mb-0 md:w-2/5 ${className}`}>
            {children}
        </button>
    );
}