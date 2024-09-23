export default function SubmitButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className="w-full bg-green-500 text-white rounded-md h-10">Submit</button>
    );
}