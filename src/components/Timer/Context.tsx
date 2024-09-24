import { createContext, ReactNode, useContext, useReducer } from "react";

interface TimerType {
    time: number,
    pomoElapsedTime: number,
    pomoFocusTime: number,
    pomoBreakTime: number,
    isRunning: boolean,
    isReset: boolean,
    isBreakTime: boolean,
    mode: 'normal' | 'pomo'
}

interface TaskDataType {
    id: number,
    taskTitle: string,
    timeSpent: number,
}

type TimerAction =
    | { type: 'toggle' }
    | { type: 'reset', time: number }
    | { type: 'running', time: number }
    | { type: 'pomo_running', remainingTime: number, elapsedTime: number }
    | { type: 'change_mode_pomo' }
    | { type: 'change_mode_normal' }
    | { type: 'pomo_stop_focus' }
    | { type: 'pomo_stop_break' }
    | { type: 'pomo_change_mode_focus' }
    | { type: 'pomo_change_mode_break' };

type TaskAction =
    | { type: 'update_task_title', input: string }
    | { type: 'reset_task_title' };

type TasksDataAction =
    | { type: 'submit', id: number, taskTitle: string, timeSpent: number }
    | { type: 'delete', id: number }
    | { type: 'edit' }

const initialTimerSetting: TimerType = {
    time: 0,
    pomoElapsedTime: 0,
    pomoFocusTime: 25 * 60,
    pomoBreakTime: 5 * 60,
    isRunning: false,
    isReset: false,
    isBreakTime: false,
    mode: 'normal'
};

const initialTaskData: TaskDataType = {
    id: 0,
    taskTitle: '',
    timeSpent: 0
};

const intitialTasksData: TaskDataType[] = [];

export const TimerContext = createContext<TimerType>(initialTimerSetting);
export const TimerDispatchContext = createContext<React.Dispatch<TimerAction>>(() => { throw new Error('Dispatch not implemented') });

export const TaskDataContext = createContext<TaskDataType>(initialTaskData);
export const TaskDataDispatchContext = createContext<React.Dispatch<TaskAction>>(() => { throw new Error('Dispatch not implemented') });

export const TasksDataContext = createContext<TaskDataType[]>(intitialTasksData);
export const TasksDataDispatchContext = createContext<React.Dispatch<TasksDataAction>>(() => { throw new Error('Dispatch not implemented') });


function TimerProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(timerReducer, initialTimerSetting);

    return (
        <TimerContext.Provider value={state}>
            <TimerDispatchContext.Provider value={dispatch}>
                {children}
            </TimerDispatchContext.Provider>
        </TimerContext.Provider>
    );
}

function TaskDataProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(taskDataReducer, initialTaskData);

    return (
        <TaskDataContext.Provider value={state}>
            <TaskDataDispatchContext.Provider value={dispatch}>
                {children}
            </TaskDataDispatchContext.Provider>
        </TaskDataContext.Provider>
    );
}

export function TasksDataProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(tasksDataReducer, intitialTasksData);

    return (
        <TasksDataContext.Provider value={state}>
            <TasksDataDispatchContext.Provider value={dispatch}>
                <TimerProvider>
                    <TaskDataProvider>
                        {children}
                    </TaskDataProvider>
                </TimerProvider>
            </TasksDataDispatchContext.Provider>
        </TasksDataContext.Provider>
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
        case 'pomo_running':
            return { ...state, time: action.remainingTime, pomoElapsedTime: action.elapsedTime };
        case 'change_mode_normal':
            return { ...state, time: 0, mode: 'normal', isRunning: false, isReset: true, pomoElapsedTime: 0 };
        case 'change_mode_pomo':
            return { ...state, time: state.pomoFocusTime, mode: 'pomo', isRunning: false, isReset: true, isBreakTime: false, pomoElapsedTime: 0 };
        case 'pomo_stop_focus':
            return { ...state, time: state.pomoFocusTime, isRunning: false, pomoElapsedTime: state.pomoFocusTime };
        case 'pomo_stop_break':
            return { ...state, time: state.pomoBreakTime, isRunning: false, pomoElapsedTime: state.pomoBreakTime };
        case 'pomo_change_mode_focus':
            return { ...state, time: state.pomoFocusTime, isRunning: false, isBreakTime: false, pomoElapsedTime: 0 };
        case 'pomo_change_mode_break':
            return { ...state, time: state.pomoBreakTime, isRunning: false, isBreakTime: true, pomoElapsedTime: 0 };
        default:
            return state;
    }
}

function taskDataReducer(state: TaskDataType, action: TaskAction): TaskDataType {
    switch (action.type) {
        case 'update_task_title':
            return { ...state, taskTitle: action.input };
        case 'reset_task_title':
            return { ...state, taskTitle: '' };
        default:
            return state;
    }
}

function tasksDataReducer(state: TaskDataType[], action: TasksDataAction): TaskDataType[] {
    switch (action.type) {
        case 'submit':
            console.log(state);
            const newTaskData = {
                id: action.id,
                taskTitle: action.taskTitle,
                timeSpent: action.timeSpent
            };
            return [...state, newTaskData];
        case 'delete':
            const newTasksData = state.filter(elem => elem.id !== action.id);
            return newTasksData;
        default:
            return state;
    }
}