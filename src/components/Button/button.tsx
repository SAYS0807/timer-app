interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    className: string,
    children: React.ReactNode,
}

export default function Button({ onClick, className, children }: Props) {
    return (
        <button onClick={onClick} className={`text-white rounded-md p-3 mb-3 w-full md:mb-0 md:w-2/5 ${className}`}>
            {children}
        </button>
    );
}