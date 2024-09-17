import { useState, useEffect } from "react";
import SubmitStatusContainer from "./SubmitStatusContainer";

interface SubmitContainerProps {
    submitTaskData: () => void,
    time: number,
    title: string,
}

export default function SubmitContainer({ submitTaskData, time, title}: SubmitContainerProps) {
    const [errorMsg, setErrorMsg] = useState<string[]>([]);

    const handleClick = () => {
        if (validateData().length !== 0) {
            setErrorMsg(validateData());
            return;
        } else {
            setErrorMsg([]);
            submitTaskData();
        }
    }

    const validateData = () => {
        let curError: string[] = [];
        if (title === '') curError.push('You need to fill the task name!');
        if (title.length > 20) curError.push('The task name must be under 20 characters!');
        if (time <= 0) curError.push('You need to do the task for at least one second!');
        return curError;
    }


    return (
        <div className="w-full mx-auto">
            <button onClick={handleClick} className={`${time <= 0 || title === '' || title.length > 20 ? "bg-gray-500" : "bg-green-400 cursor-auto"} text-white rounded-md mb-5 p-3 w-full md:w-full`}>
                Submit
            </button>
            <SubmitStatusContainer errorMsg={errorMsg} />
        </div>
    );
}