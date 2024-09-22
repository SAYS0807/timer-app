
import TimerUI2 from "./TimerUI";
import { TimerProvider } from "./Context";
import ButtonContainer from "./ButtonContainer";

export default function Timer2() {

    return (
        <div className="mx-auto w-5/6 md:w-4/5 md:bg-gray-50 md:drop-shadow-md md:rounded-md md:p-8 md:min-h-96">
            <div className="mx-auto w-full mt-5">
                <TimerProvider>
                    <TimerUI2 />
                    <ButtonContainer />
                </TimerProvider>
            </div>
        </div>
    );
}