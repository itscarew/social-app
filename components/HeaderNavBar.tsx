import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Input from "./Input";
import { AiOutlineHome, AiOutlineUser, AiOutlineNotification, AiOutlineSetting, AiOutlineLogout, AiOutlineMenu } from "react-icons/ai"
import { BiMessageSquareAdd } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { app } from "@/utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import { clearAUthUser } from "@/store/slice/authSlice";

export default function HeaderNavBar() {
    const dispatch = useDispatch()
    const authUser = useSelector((state: RootState) => state.user)
    const router = useRouter();
    const auth = getAuth(app);

    const [open, setOpen] = useState<boolean>(false)

    const handleHambuger = () => {
        setOpen(!open)
    }

    useEffect(() => {
        setOpen(false)
    }, [router.pathname])

    const routes = [
        { name: "Home", icon: <AiOutlineHome size={20} />, href: "/" },
        { name: "Explore", icon: <AiOutlineUser size={20} />, href: "/explore" },
        // { name: "Notification", icon: <AiOutlineNotification size={20} />, href: "/notification" },
        // { name: "Create", icon: <BiMessageSquareAdd size={20} />, href: "#" },
        { name: "Settings", icon: <AiOutlineSetting size={20} />, href: "/settings" },
    ]

    const handleSignOut = () => {
        auth.signOut()
        dispatch(clearAUthUser())
        router.push("/auth")
    };

    return (
        <>
            <nav className="bg-white  border-gray-200 px-2 sm:px-4 py-4 shadow-sm block md:hidden relative z-40 ">
                <div className="flex flex-wrap items-center justify-between mx-auto px-4">
                    <Link href="/" className=' text-2xl flex items-center font-medium'>
                        <h1 className='ml-2 font-normal '>SocialApp</h1>
                    </Link>
                    <div className="flex md:order-2">
                        <div className="relative hidden md:block">
                            <Input />
                        </div>
                        <button onClick={handleHambuger} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
                            <span className="sr-only">Open menu</span>
                            <AiOutlineMenu />
                        </button>
                    </div>
                    <div className={`items-center overflow-y-auto h-screen justify-between ${open ? "" : "hidden"} w-full md:flex md:w-auto md:order-1" id="navbar-search`}>
                        <div className="relative mt-3 hidden">
                            <Input />
                        </div>
                        {routes.map((route, index) => {
                            return (
                                <div key={index}>
                                    <Link className={`relative flex items-center py-2 my-2 rounded-lg px-2 ${route.name === "Support" && "mt-6"}  ${router.pathname == route.href ? "" : ""} `} href={route.href}>
                                        {route.icon}  <div className='ml-4'>{route.name}  </div>
                                        {(route.name === "Dashboard") && <div className="absolute right-0 rounded-full h-7 w-10 ml-2 flex items-center justify-center ">10 </div>}
                                    </Link>
                                </div>)
                        })}
                        <div className="flex items-center  border-t-2 border-gray-200 justify-between text-sm py-6 " >
                            <div className="flex items-center" >
                                <div className="relative  rounded-full overflow-hidden w-12 h-12 mr-2" >
                                    <Image src={authUser.authUser?.photoURL} alt="#" fill style={{ objectFit: "cover" }} />
                                </div>
                                <Link href={"/profile"} >
                                    <p> {authUser.authUser?.email} </p>
                                    <p className="text-green-400" > online </p>
                                </Link>
                            </div>
                            <div className=" cursor-pointer" onClick={handleSignOut} >
                                <AiOutlineLogout size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}