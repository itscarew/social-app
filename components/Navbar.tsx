import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Input from "./Input";
import { AiOutlineHome, AiOutlineUser, AiOutlineNotification, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai"
import { BiMessageSquareAdd } from "react-icons/bi"
import { CiSearch } from "react-icons/ci";
import Modal from "./modal";
import CreatePostComponent from "./CreatePostComponen";
import { getAuth } from "firebase/auth";
import { app } from "@/utils/firebaseConfig";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "@/store/slice/modalSlice";
import { clearAUthUser, setAuthUser } from "@/store/slice/authSlice";

export default function NavBar() {
    const dispatch = useDispatch()
    const auth = getAuth(app);
    const authUser = useSelector((state: RootState) => state.user)
    const modal = useSelector((state: RootState) => state.modal.modal)
    const router = useRouter();
    const routes = [
        { name: "Home", icon: <AiOutlineHome size={20} />, href: "/" },
        { name: "Explore", icon: <AiOutlineUser size={20} />, href: "/explore" },
        // { name: "Notification", icon: <AiOutlineNotification size={20} />, href: "/notification" },
        { name: "Create", icon: <BiMessageSquareAdd size={20} />, href: "#" },
        { name: "Settings", icon: <AiOutlineSetting size={20} />, href: "/settings" },
    ]

    const handleCreate = () => {
        dispatch(openModal())
    }

    const handleSignOut = () => {
        auth.signOut()
        dispatch(clearAUthUser())
        router.push("/auth")
    };

    return (
        <nav className='w-72 py-10 border-r-2 border-gray-200 px-6 hidden md:block  '>
            <Link href={"/"} className=' text-2xl flex items-center font-medium'>  <h1 className='ml-3 font-normal '> SocialApp </h1></Link>
            <div className="pt-6" >
                <Input rounded icon={<CiSearch size={"20"} className='absolute left-3' />} placeHolder="Search" className="pl-10 border-2 " />
            </div>
            <div className=' pt-2'>
                {routes.map((route, index) => {
                    return (
                        <div key={index}>
                            <div className={`relative flex cursor-pointer items-center py-2 my-2 rounded-lg px-2 ${route.name === "Support" && "mt-6"} 
                             ${router.pathname == route.href ? "bg-gray-50" : ""} hover:bg-gray-50 `}
                                onClick={route.name === "Create" ? handleCreate : () => router.push(route.href)}
                            >
                                {route.icon}  <div className='ml-4 text-lg font-light  '>{route.name}  </div>
                                {(route.name === "Notification") && <div className="absolute right-0 bg-dodger-blue-500 text-white  rounded-full h-7 w-10 ml-2 flex items-center justify-center ">10 </div>}
                            </div>
                        </div>)
                })}
            </div>

            <div className="flex items-center border-t-2 border-gray-200 justify-between text-sm py-6 " >
                <div className="flex items-center" >
                    <Link href={"/profile"} className="relative  rounded-full overflow-hidden w-10 h-10 mr-2" >
                        <Image src={authUser.authUser?.photoURL} alt="#" fill style={{ objectFit: "cover" }} />
                    </Link>
                    <Link href={"/profile"} >
                        <p> {authUser.authUser?.email} </p>
                        <p className="text-green-400" > online </p>
                    </Link>
                </div>
                <div className=" cursor-pointer" onClick={handleSignOut} >
                    <AiOutlineLogout size={20} />
                </div>
            </div>

            <Modal isOpen={modal} onClose={() => dispatch(closeModal())} title="Create new post" className="max-w-4xl" >
                <CreatePostComponent />
            </Modal>
        </nav>
    )
}