import React, { useContext } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Input from "./Input";
import { AiOutlineHome, AiOutlineUser, AiOutlineNotification, AiOutlineSetting, AiOutlineLogout, AiOutlineMenu } from "react-icons/ai"
import { BiMessageSquareAdd } from "react-icons/bi"
import { CiSearch } from "react-icons/ci";

export default function NavBar() {
    const router = useRouter();
    const routes = [
        { name: "Home", icon: <AiOutlineHome size={20} />, href: "/" },
        { name: "Explore", icon: <AiOutlineUser size={20} />, href: "/explore" },
        { name: "Notification", icon: <AiOutlineNotification size={20} />, href: "/notification" },
        { name: "Create", icon: <BiMessageSquareAdd size={20} />, href: "#" },
        { name: "Settings", icon: <AiOutlineSetting size={20} />, href: "/settings" },
    ]

    return (
        <nav className='w-72 py-10 border-r-2 border-gray-200 px-6 hidden md:block  '>
            <div className=' text-2xl flex items-center font-medium'>  <h1 className='ml-3 font-light'> SocialApp </h1></div>
            <div className="pt-6" >
                <Input rounded icon={<CiSearch size={"20"} className='absolute left-3' />} placeHolder="Search" className="pl-10 border-2 " />
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
                    <Link href={"/profile"} className="relative  rounded-full overflow-hidden w-10 h-10 mr-2" >
                        <Image src={"/pic1.jpeg"} alt="#" fill />
                    </Link>
                    <Link href={"/profile"} >
                        <p>Olivia Rhye</p>
                        <p className="font-normal" >olivia@untitledui.com</p>
                    </Link>
                </div>
                <div className=" cursor-pointer" >
                    <AiOutlineLogout size={20} />
                </div>
            </div>

        </nav>
    )
}