import Image from "next/image";
import ExploreCard from "./ExploreCardComponent";
import { AiOutlineSetting } from "react-icons/ai"
import Link from "next/link";
import { useState, useEffect } from "react"
import { getUserPosts, getAUser } from "@/functions";
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/index'

export default function ProfileComponent() {
    const authUser = useSelector((state: RootState) => state.user)
    const [posts, setPosts] = useState<any>([])

    useEffect(() => {
        const subscribe = async () => {
            const userPosts = await getUserPosts()
            setPosts(userPosts)
        }
        subscribe();
    }, [])

    return (
        <>
            <div className=" max-w-screen-lg px-10 py-6 mx-4 bg-white rounded-lg shadow md:mx-auto border-1">
                <div className="flex flex-col items-start w-full m-auto sm:flex-row">
                    <div className="flex mx-auto sm:mr-10 sm:m-0">
                        <div className="relative items-center justify-center w-20 h-20 m-auto mr-4 sm:w-32 sm:h-32">
                            <Image alt="profil"
                                src={authUser.authUser?.avatar}
                                className="object-cover w-20 h-20 mx-auto rounded-full sm:w-32 sm:h-32" fill />
                        </div>
                    </div>
                    <div className="flex flex-col pt-4 mx-auto my-auto sm:pt-0 sm:mx-0">
                        <div className="flex flex-col mx-auto sm:flex-row sm:mx-0 ">
                            <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl"> {authUser.authUser?.username} </h2>
                            <div className="flex">
                                <Link
                                    href={"/settings"}
                                    className="flex items-center px-4 text-sm font-medium text-gray-900 bg-transparent border border-gray-600 rounded outline-none sm:ml-2 hover:bg-dodger-blue-600 hover:text-white focus:outline-none hover:border-dodger-blue-700">Edit
                                    profile</Link>
                                <Link href={"/settings"} className="p-1 ml-2 text-gray-700 border-transparent rounded-full cursor-pointer hover:text-dodger-blue-600 focus:outline-none focus:text-gray-600"
                                    aria-label="Notifications">
                                    <AiOutlineSetting size={25} />
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 space-x-2">
                            <div className="flex"><span className="mr-1 font-semibold"> {posts.length}  </span> Post</div>
                            <Link href={`/okokok/followers`} className="flex"><span className="mr-1 font-semibold"> {authUser.authUser?.following?.length}  </span> Followers</Link>
                            <Link href={`/okokok/following`} className="flex"><span className="mr-1 font-semibold"> {authUser.authUser?.following?.length} </span> Following</Link>
                        </div>
                    </div>
                </div>
                <div className="w-full pt-5">
                    <h1 className="text-lg font-semibold text-gray-800 sm:text-xl"> {authUser.authUser?.name}</h1>
                    <p className="text-sm text-gray-800 md:text-base"> {authUser.authUser?.bio} </p>
                    <a href={authUser.authUser?.website} target="/_blank" className="text-sm text-gray-500 md:text-base">{authUser.authUser?.website} </a>
                </div>
            </div>

            <div className="max-w-screen-lg py-6 md:mx-auto flex items-start flex-wrap "  >
                {posts.map((post) => {
                    return (
                        <ExploreCard key={post.id} posts={post.data()} height="h-80" />
                    )
                })}
            </div>
        </>
    )
}