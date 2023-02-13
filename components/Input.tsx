import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router"
import { CiSearch } from "react-icons/ci"

export default function Input({ className, rounded, icon, placeHolder }: Partial<any>) {
    const [data, setData] = useState("");
    const handleChange = (e: any) => {
        setData(e.target.value)
    }
    return (
        <>
            <div className='flex items-center relative ' >
                <input
                    type={"text"}
                    className={`w-full outline-none ${rounded && "rounded-lg"}  py-2 ${className}  border-gray-300 focus:outline-none  focus:border-gray-400 `}
                    placeholder={placeHolder}
                    value={data}
                    onChange={handleChange}
                />
                {icon}
            </div>
        </>
    )
}





