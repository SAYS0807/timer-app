import { useContext, useEffect, useState } from "react";
import { TaskDataContext, TaskDataDispatchContext, TasksDataDispatchContext, TimerContext, TimerDispatchContext } from "../Timer/Context";
import SubmitButton from "./SubmitButton";
import SubmitStatusDisplay from "./SubmitStatusDisplay";

export default function SubmitContainer2() {
    const [statusArr, setStatusArr] = useState<string[]>(['Have you done your task?']);
    const [isError, setIsError] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [count, setCount] = useState(0);

    const timer = {
        state: useContext(TimerContext),
        dispatch: useContext(TimerDispatchContext)
    };
    const taskData = {
        state: useContext(TaskDataContext),
        dispatch: useContext(TaskDataDispatchContext)
    };
    const tasksDataDispatch = useContext(TasksDataDispatchContext);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        if (!isError) {
            switch (timer.state.mode) {
                case 'normal':
                    tasksDataDispatch({ type: 'submit', id: count, taskTitle: taskData.state.taskTitle, timeSpent: timer.state.time });
                    timer.dispatch({ type: 'reset', time: 0 });
                    taskData.dispatch({ type: 'reset_task_title' });
                    break;
                case 'pomo':
                    if (!timer.state.isBreakTime) {
                        tasksDataDispatch({ type: 'submit', id: count, taskTitle: taskData.state.taskTitle, timeSpent: timer.state.pomoElapsedTime });
                        timer.dispatch({ type: 'change_mode_pomo' });
                        taskData.dispatch({ type: 'reset_task_title' });
                        break;
                    } else {
                        tasksDataDispatch({ type: 'submit', id: count, taskTitle: 'Have a break', timeSpent: timer.state.pomoElapsedTime });
                        timer.dispatch({ type: 'change_mode_pomo' });
                        taskData.dispatch({ type: 'reset_task_title' });
                        break;
                    }
                default:
                    break;
            }
        }
    }, [count]);

    function validateData() {
        const errorMsg: string[] = [];
        if (timer.state.mode === 'normal') {
            switch (true) {
                case (taskData.state.taskTitle === ''):
                    errorMsg.push('You need to enter the task title!!');
                    break;
                case (taskData.state.taskTitle.length > 20):
                    errorMsg.push('The task title must be under 20 characters!');
                case (timer.state.time <= 0):
                    errorMsg.push('You need to do the task for at least 1 second!');
                default:
                    break;
            }
        } else {
            if (!timer.state.isBreakTime) {
                taskData.state.taskTitle === '' && errorMsg.push('You need to enter the task title!!');
                taskData.state.taskTitle.length > 20 && errorMsg.push('The task title must be under 20 characters!');
                timer.state.pomoElapsedTime === 0 && errorMsg.push('You need to do the task for at least 1 second!');
            } else {
                taskData.state.taskTitle.length > 20 && errorMsg.push('The task title must be under 20 characters!');
            }
        }
        if (errorMsg.length === 0) {
            setIsError(false);
            setCount(count + 1);
            setStatusArr(['Task submited. Well done!!']);
        } else {
            setIsError(true);
            setStatusArr(errorMsg);
        }
    }

    return (
        <div className="mx-auto w-ful md:w-3/4">
            <SubmitButton onClick={validateData} />
            <SubmitStatusDisplay statusObj={{ statusArr, isError }} />
        </div>
    );
}