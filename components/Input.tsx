import React from "react";


export default function Input({ className, rounded, icon, placeHolder, value, onChange }: Partial<any>) {
    return (
        <>
            <div className='flex items-center relative ' >
                <input
                    type={"text"}
                    className={`w-full outline-none ${rounded && "rounded-lg"}  py-2 ${className}  border-gray-300 focus:outline-none  focus:border-gray-400 `}
                    placeholder={placeHolder}
                    value={value}
                    onChange={onChange}
                />
                {icon}
            </div>
        </>
    )
}





