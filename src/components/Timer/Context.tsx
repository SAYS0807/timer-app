import { createContext, ReactNode, useContext, useReducer } from "react";

interface TimerType {
    time: number,
    pomoFocusTime: number,
    pomoBreakTime: number,
    isRunning: boolean,
    isReset: boolean,
    isBreakTime: boolean,
    mode: 'normal' | 'pomo'
}

type TimerAction = { type: 'toggle' } | { type: 'reset', time: number } | { type: 'running', time: number } | { type: 'change_mode_pomo' } | { type: 'change_mode_normal' } | { type: 'pomo_stop_focus' } | { type: 'pomo_stop_break' };

const initialTimerSetting: TimerType = {
    time: 0,
    pomoFocusTime: 25 * 60,
    pomoBreakTime: 5 * 60,
    isRunning: false,
    isReset: false,
    isBreakTime: false,
    mode: 'normal'
};

export const TimerContext = createContext<TimerType>(initialTimerSetting);
export const TimerDispatchContext = createContext<React.Dispatch<TimerAction>>(() => { throw new Error('Dispatch not implemented') });

export function TimerProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(timerReducer, initialTimerSetting);

    return (
        <TimerContext.Provider value={state}>
            <TimerDispatchContext.Provider value={dispatch}>
                {children}
            </TimerDispatchContext.Provider>
        </TimerContext.Provider>
    );
}

function timerReducer(state: TimerType, action: TimerAction): TimerType {
    switch (action.type) {
        case 'toggle':
            return { ...state, isRunning: !state.isRunning, isReset: false };
        case 'reset':
            return { ...state, time: action.time, isRunning: false, isReset: true };
        case 'running':
            return { ...state, time: action.time };
        case 'change_mode_normal':
            return { ...state, time: 0, mode: 'normal', isRunning: false, isReset: true };
        case 'change_mode_pomo':
            return { ...state, time: state.pomoFocusTime, mode: 'pomo', isRunning: false, isReset: true };
        case 'pomo_stop_focus':
            return { ...state, time: state.pomoBreakTime, isRunning: false, isBreakTime: true };
        case 'pomo_stop_break':
            return { ...state, time: state.pomoFocusTime, isRunning: false, isBreakTime: false };
        default:
            return state;
    }
}
