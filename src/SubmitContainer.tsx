import { useState, useEffect } from "react"

interface SubmitContainerProps {
    submitData: () => void,
    time: number,
    title: string,
}

export default function SubmitContainer({ submitData, time, title}: SubmitContainerProps) {
    const [errorMsg, setErrorMsg] = useState<string[]>([]);

    const handleClick = () => {
        if (validateData().length !== 0) {
            setErrorMsg(validateData());
            return;
        } else {
            setErrorMsg([]);
            submitData();
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
            <p className="text-center text-xl mb-3">You've done your task?<br></br>Let's submit!!</p>
            <button onClick={handleClick} className={`${time <= 0 || title === '' || title.length > 20 ? "bg-gray-500" : "bg-green-400 cursor-auto"} text-white rounded-md p-3 w-full md:w-full`}>
                Submit
            </button>
            <div className={`${errorMsg.length === 0 ? "hidden" : "block"} mt-3 mb-3`}>
                <p className="text-red-500 text-center text-lg mb-1">Woops! Something is wrong.</p>
                <ol className="ml-6 list-disc">
                    {errorMsg.map((msg, index) => (
                        <li key={index} className="text-red-500">{msg}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}