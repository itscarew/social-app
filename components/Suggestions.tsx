
import Image from "next/image";
import Link from "next/link";
import SuggestCard from "./SuggestCardComponent";
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { getAUser, getOtherUsers } from "@/functions";
import { RootState } from "@/store";

export default function Suggestions() {
    const authUser = useSelector((state: RootState) => state.user.authUser)
    const [users, setUsers] = useState<any[]>([])
    const [myUser, setMyUser] = useState<any>()

    const subscribe = async () => {
        if (authUser.uid) {
            const myUser = await getAUser(authUser?.uid)
            const users = await getOtherUsers(authUser?.uid)
            setMyUser(myUser.data())
            setUsers(users)
        }
    }

    useEffect(() => {
        subscribe();
    }, [authUser.uid])


    return (
        <div>
            <div className="flex items-center text-base py-6 " >
                <Link href={"/profile"} className="relative  rounded-full overflow-hidden w-14 h-14 mr-2" >
                    <Image src={myUser?.avatar} alt="#" fill style={{ objectFit: "cover" }} />
                </Link>
                <Link href={`/profile`} >
                    <p className=' font-medium ' > {myUser?.name} </p>
                    <p className="font-normal" > {myUser?.username} </p>
                </Link>
            </div>

            <div className="flex items-center justify-between" >
                <p className="text-gray-500" >Suggetions for you</p>
                <Link href={"/explore-people"} >See All </Link>
            </div>
            {users?.map((user) => {
                return <SuggestCard key={user.id} user={user.data()} />
            })}
        </div>

    )
}