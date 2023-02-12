import React, { useContext } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Input from "./Input";
import { AiOutlineHome, AiOutlineUser, AiOutlineNotification, AiOutlineSetting, AiOutlineLogout, AiOutlineMenu } from "react-icons/ai"
import { BiMessageSquareAdd } from "react-icons/bi"

export default function NavBar() {
    const router = useRouter();
    const routes = [
        { name: "Home", icon: <AiOutlineHome size={20} />, href: "/" },
        { name: "Explore", icon: <AiOutlineUser size={20} />, href: "#" },
        { name: "Notification", icon: <AiOutlineNotification size={20} />, href: "#" },
        { name: "Create", icon: <BiMessageSquareAdd size={20} />, href: "#" },
        { name: "Settings", icon: <AiOutlineSetting size={20} />, href: "#" },
    ]

    return (
        <nav className='w-72 py-10 border-r-2 border-gray-200 px-6 hidden md:block  '>
            <div className=' text-2xl flex items-center font-medium'>  <h1 className='ml-3 font-light'> SocialApp </h1></div>
            <div className="pt-6" >
                <Input />
            </div>
            <div className=' pt-2'>
                {routes.map((route, index) => {
                    return (
                        <div key={index}>
                            <Link className={`relative flex items-center py-2 my-2 rounded-lg px-2 ${route.name === "Support" && "mt-6"}  ${router.pathname == route.href ? "" : ""} `} href={route.href}>
                                {route.icon}  <div className='ml-4 text-lg font-light  '>{route.name}  </div>
                                {(route.name === "Notification") && <div className="absolute right-0 rounded-full h-7 w-10 ml-2 flex items-center justify-center ">10 </div>}
                            </Link>
                        </div>)
                })}
            </div>

            <div className="flex items-center border-t-2 border-gray-200 justify-between text-sm py-6 " >
                <div className="flex items-center" >
                    <div className="relative  rounded-full overflow-hidden w-10 h-10 mr-2" >
                        <Image src={"/pic1.jpeg"} alt="#" fill />
                    </div>
                    <div>
                        <p>Olivia Rhye</p>
                        <a className="font-normal" href="mailto:email@example.com">olivia@untitledui.com</a>
                    </div>
                </div>
                <div className=" cursor-pointer" >
                    <AiOutlineLogout size={20} />
                </div>
            </div>

        </nav>
    )
}