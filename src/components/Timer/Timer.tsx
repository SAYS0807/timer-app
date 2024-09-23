
import TimerUI from "./TimerUI";
import ButtonContainer from "./ButtonContainer";
import TaskInput from "../TaskList/TaskInput";
import SubmitContainer2 from "../Submit/SubmitContainer2";

export default function Timer() {

    return (
        <div className="mx-auto w-full h-full md:w-full md:bg-gray-50 md:drop-shadow-md md:rounded-md md:p-4">
            <div className="mx-auto w-full h-full md:flex md:flex-col md:justify-start md:gap-y-10">
                <div>
                    <TimerUI />
                    <ButtonContainer />
                </div>
                <TaskInput />
                <SubmitContainer2 />
            </div>
        </div>
    );
}