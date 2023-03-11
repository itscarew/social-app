


import { deletePost } from "@/functions";
import { RootState } from "@/store";
import { togleChange } from "@/store/slice/changeSlice";
import { openModal } from "@/store/slice/modalSlice";
import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteButton({ post, postId, postUserId }) {
    const dispatch = useDispatch()

    const authUser = useSelector((state: RootState) => state.user.authUser)

    const deleteAPost = async () => {
        await deletePost(postId, post?.picture);
        dispatch(togleChange())
    }
    return (
        <>
            {authUser?.uid === postUserId && <div onClick={deleteAPost} className="absolute top-0 right-0 z-20 cursor-pointer" > <RiDeleteBinLine size={23} /> </div>}
        </>
    )
}





