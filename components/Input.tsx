import React from "react";

type InputProps = {
    className: string;
    rounded: boolean;
    icon: any;
    placeHolder: string;
    value: any;
    name: any;
    onChange: any;
    readOnly: boolean
};


export default function Input({ className, rounded, icon, placeHolder, value, name, onChange, readOnly }: Partial<InputProps>) {
    return (
        <>
            <div className='flex items-center relative ' >
                <input
                    type={"text"}
                    className={`w-full outline-none ${rounded && "rounded-lg"}  py-2 ${className}  border-gray-300 focus:outline-none  focus:border-gray-400 `}
                    placeholder={placeHolder}
                    value={value}
                    name={name}
                    onChange={onChange}
                    readOnly={readOnly}
                />
                {icon}
            </div>
        </>
    )
}





