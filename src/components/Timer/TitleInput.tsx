interface Title {
    onChange: (value: string) => void,
    title: string,
}

export default function TitleInput({ onChange, title }: Title) {
    return (
        <input type="text" onChange={(e) => onChange(e.target.value)} className="w-full border-2 border-gray-600 rounded-md h-9 text-xl px-4 placeholder:text-lg" value={title} placeholder="Write the task name here..."></input>
    );
}