export default function TimerUI({ time }: { time: number }) {
    const fixTime = time
    return (
        <div className="rounded-full w-56 h-56 felx content-center mx-auto my-5 bg-gradient-to-r from-blue-500 to-cyan-400">
            <p className="text-center text-4xl font-thin tracking-wider w-full text-white mx-auto">{(Math.floor(fixTime / 3600)).toString().padStart(2, '0')} : {(Math.floor(fixTime % 3600 / 60)).toString().padStart(2, '0')} : {(Math.floor(fixTime % 60)).toString().padStart(2, '0')}</p>
        </div>

    );
}