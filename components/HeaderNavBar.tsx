import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Input from "./Input";
import { AiOutlineHome, AiOutlineUser, AiOutlineNotification, AiOutlineSetting, AiOutlineLogout, AiOutlineMenu } from "react-icons/ai"
import { BiMessageSquareAdd } from "react-icons/bi"

export default function HeaderNavBar({ children }: any) {
    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false)

    const handleHambuger = () => {
        setOpen(!open)
    }

    useEffect(() => {
        setOpen(false)
    }, [router.pathname])

    const routes = [
        { name: "Home", icon: <AiOutlineHome />, href: "/" },
        { name: "Explore", icon: <AiOutlineUser />, href: "#" },
        // { name: "Notification", icon: <AiOutlineNotification />, href: "#" },
        { name: "Create", icon: <BiMessageSquareAdd />, href: "#" },
        { name: "Settings", icon: <AiOutlineSetting />, href: "#" },
    ]

    return (
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-4 shadow-sm block md:hidden relative ">
                <div className="flex flex-wrap items-center justify-between mx-auto px-4">
                    <Link href="/" className="flex items-center">
                        <h1>SocialApp</h1>
                        <span className="self-center text-xl font-semibold whitespace-nowrap  ml-3 "> Untitled UI  </span>
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
                        <div className="relative mt-3 md:hidden">
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
                                    <Image src={"/Avatar-5.png"} alt="#" fill />
                                </div>
                                <div>
                                    <p>Carew Hello</p>
                                    <a className="font-normal" href="mailto:olivia@untitledui.com">olivia@untitledui.com</a>
                                </div>
                            </div>
                            <div className=" cursor-pointer" >
                                <AiOutlineLogout />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}