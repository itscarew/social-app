type ButtonProps = {
    className: string;
    children: any;
    style: any
    onClick: any
};


export default function Button({ className, children, style, onClick }: Partial<ButtonProps>) {
    return (
        <>
            <button className={`flex items-center justify-center text-white rounded-lg px-4   ${className}`} style={style} onClick={onClick} > {children} </button>
        </>
    )
}