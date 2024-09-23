import { useState } from "react";

interface PropsType {
    statusArr: string[],
    isError: boolean
}

export default function SubmitStatusDisplay({ statusObj }: { statusObj: PropsType }) {
    return (
        <ol className="mt-5">
            {statusObj.statusArr.map((status, index) => (
                <li key={index} className={`${statusObj.isError ? 'text-red-500' : 'text-black'}`}>{status}</li>
            ))}
        </ol>
    );
}