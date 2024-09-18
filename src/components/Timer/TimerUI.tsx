export default function TimerUI({ time }: { time: number }) {
    const fixTime = time
    return (
        <p className="text-center text-2xl mb-5">{(Math.floor(fixTime / 3600)).toString().padStart(2, '0')} : {(Math.floor(fixTime % 3600 / 60)).toString().padStart(2, '0')} : {(Math.floor(fixTime % 60)).toString().padStart(2, '0')}</p>
    );
}