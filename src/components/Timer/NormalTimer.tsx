export default function NormalTimer({ time }: { time: number }) {

    return (
        <p className="text-center text-4xl font-thin tracking-wider w-full text-white mx-auto">{(Math.floor(time / 3600)).toString().padStart(2, '0')} : {(Math.floor(time % 3600 / 60)).toString().padStart(2, '0')} : {(Math.floor(time % 60)).toString().padStart(2, '0')}</p>
    );
}