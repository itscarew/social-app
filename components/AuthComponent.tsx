import React from "react";
import { app } from "../utils/firebaseConfig"
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import Button from "./Button";

export default function AuthComponent() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const signIn = () => signInWithPopup(auth, provider)
    return (
        <>
            <div className='flex items-center justify-center  fixed bottom-0 left-0 h-32 w-full bg-black opacity-80 z-50 ' >
                <Button className=' bg-dodger-blue-500 text-white px-12  py-3' onClick={signIn} >Sign In</Button>
            </div>
        </>
    )
}





