export default function TimerUI({ time }: { time: number }) {
    return (
        <p className="text-center text-2xl mb-5">{(Math.floor(time / 3600)).toString().padStart(2, '0')} : {(Math.floor(time % 3600 / 60)).toString().padStart(2, '0')} : {(Math.floor(time % 60)).toString().padStart(2, '0')}</p>
    );
}