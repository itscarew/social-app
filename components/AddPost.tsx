import { openModal } from "@/store/slice/modalSlice";
import React from "react";
import { BiMessageSquareAdd } from "react-icons/bi"
import { useDispatch } from "react-redux";

export default function AddPost() {
    const dispatch = useDispatch()

    const handleCreate = () => {
        dispatch(openModal())
    }
    return (
        <>
            <div onClick={handleCreate} className='fixed right-5 cursor-pointer top-[35rem] shadow-lg flex items-center justify-center z-2 w-14 h-14 rounded-full border border-gray-300  bg-white md:hidden ' >
                <BiMessageSquareAdd size={20} />
            </div>
        </>
    )
}





