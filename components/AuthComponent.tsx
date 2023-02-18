import React from "react";
import { app, dataBase } from "../utils/firebaseConfig"
import { collection, addDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react"
import Button from "./Button";

export default function AuthComponent() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const userCollection = collection(dataBase, 'users');

    const signIn = () => signInWithPopup(auth, provider);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                //set auth user parameter
                /////////////here

                // Create a reference to the document with the user's UID
                const userRef = doc(userCollection, user.uid);
                const oneDoc = await getDoc(userRef)
                if (!oneDoc.exists()) {
                    setDoc(userRef, {
                        uid: user.uid,
                        name: user.displayName,
                        username: '',
                        bio: '',
                        website: '',
                        email: user.email,
                        phone: user.phoneNumber
                    })
                }
            } else {
                //set auth user parameter to null
                /////////////here
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <div className='flex items-center justify-center  fixed bottom-0 left-0 h-32 w-full bg-black opacity-80' >
                <Button className=' bg-dodger-blue-500 text-white px-12  py-3' onClick={signIn} >Sign In</Button>
            </div>
        </>
    )
}





