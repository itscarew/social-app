type ButtonProps = {
    className: string;
    children: any;
    style: any
    onClick: any
    disabled: boolean
};


export default function Button({ className, children, style, onClick, disabled }: Partial<ButtonProps>) {
    return (
        <>
            <button className={`flex items-center justify-center rounded-lg px-4   ${className}`} style={style} onClick={onClick} disabled={disabled} > {children} </button>
        </>
    )
}