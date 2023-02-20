
import Image from "next/image";
import Link from "next/link";
import { FcLike } from "react-icons/fc"
import { FaRegComment } from "react-icons/fa"
import CommentCard from "./CommentComponenet";
import Button from "./Button";
import SuggestCard from "./SuggestCardComponent";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getUserPosts, getAllPosts, getAUser, getOtherUsers } from "@/functions";
import { RootState } from "@/store";

export default function Suggestions({ height }: Partial<any>) {

    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        const subscribe = async () => {
            const users = await getOtherUsers()
            setUsers(users)
        }
        subscribe();
    }, [])

    return (
        <div>
            <div className="flex items-center text-base py-6 " >
                <Link href={"/profile"} className="relative  rounded-full overflow-hidden w-14 h-14 mr-2" >
                    <Image src={"/pic1.jpeg"} alt="#" fill style={{ objectFit: "cover" }} />
                </Link>
                <Link href={"/profile"} >
                    <p className=' font-medium ' >Olivia Rhye</p>
                    <p className="font-normal" >@itsmeieijij</p>
                </Link>
            </div>

            <div className="flex items-center justify-between" >
                <p className="text-gray-500" >Suggetions for you</p>
                <Link href={"/explore-people"} >See All </Link>
            </div>
            {users.map((user) => {
                return <SuggestCard key={user.id} user={user.data()} userId={user.id} />
            })}
        </div>

    )
}