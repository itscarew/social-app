import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router"
import { CiSearch } from "react-icons/ci"

export default function Input() {
    const [data, setData] = useState("");
    const handleChange = (e: any) => {
        setData(e.target.value)
    }
    return (
        <>
            <div className='flex items-center relative mb-4' >
                <input
                    type={"text"}
                    className={`w-full border-2 outline-none rounded-lg py-2 pl-10 border-gray-300 focus:outline-none  focus:border-gray-400 `}
                    placeholder='Search'
                    value={data}
                    onChange={handleChange}
                />
                <CiSearch size={"20"} className='absolute left-3' />
            </div>
        </>
    )
}





