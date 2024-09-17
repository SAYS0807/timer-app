import { useState, useEffect } from "react";

export default function SubmitStatusContainer({ errorMsg }: { errorMsg: string[] }) {

    const [statusArr, setStatusArr] = useState<string[]>([]);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setStatusArr(['Have you done your task?']);
    }, []);

    useEffect(() => {
        if(isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        if(errorMsg.length !== 0) {
            setStatusArr([...errorMsg]);
        } else {
            setStatusArr(['Well done!!']);
        }
    }, [errorMsg]);

    return (
        <div className="bg-white flex p-3">
            <ol className={`content-center w-full ${errorMsg.length !== 0 && 'list-disc ml-5'}`}>
                {statusArr.map((status, index) => (
                    <li className={`${errorMsg.length !== 0 ? 'text-red-500 text-left' : 'text-center'}`} key={index}>{status}</li>
                ))}
            </ol>
        </div>
    );
}