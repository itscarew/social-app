import Image from "next/image";
import ExploreCard from "./ExploreCardComponent";
import { AiOutlineSetting } from "react-icons/ai"
import Link from "next/link";
import { useRouter } from 'next/router'
import FollowButton from "./Follow-Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { getAUser } from "@/functions";
import Skeleton from "react-loading-skeleton";

export default function ProfileComponent({ user, posts }) {
    const router = useRouter()
    const query = router.query

    const authUser = useSelector((state: RootState) => state.user.authUser)
    const [myUser, setMyUser] = useState<any>()

    const subscribe = async () => {
        const user = await getAUser(authUser?.uid);
        setMyUser(user.data())
    }

    useEffect(() => {
        if (authUser?.uid) {
            subscribe()
        }
    }, [authUser?.uid])

    return (
        <>
            <div className=" max-w-screen-lg px-10 py-6 mx-4 bg-white rounded-lg shadow md:mx-auto border-1">
                <div className="flex flex-col items-start w-full m-auto sm:flex-row">
                    <div className="flex mx-auto sm:mr-10 sm:m-0">
                        <div className="relative items-center justify-center w-20 h-20 m-auto mr-4 sm:w-32 sm:h-32">
                            {user?.avatar ?
                                <Image alt="avatar"
                                    src={user?.avatar}
                                    className="object-cover w-20 h-20 mx-auto rounded-full sm:w-32 sm:h-32" fill /> :
                                <Skeleton height={120} width={120} borderRadius={60} />}

                        </div>
                    </div>
                    <div className="flex flex-col pt-4 mx-auto my-auto sm:pt-0 sm:mx-0">
                        <div className="flex flex-col mx-auto sm:flex-row sm:mx-0 ">
                            <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl"> {user?.username} </h2>
                            {authUser?.uid &&
                                <div className="flex items-center">
                                    {query.user && query.user !== myUser?.username ?
                                        <FollowButton user={user} buttonType /> : <Link
                                            href={"/settings"}
                                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-600 rounded outline-none sm:ml-2 hover:bg-dodger-blue-600 hover:text-white focus:outline-none hover:border-dodger-blue-700">Edit
                                            profile
                                        </Link>}


                                    {!query.user &&
                                        <Link href={"/settings"} className="p-1 ml-2 text-gray-700 border-transparent rounded-full cursor-pointer hover:text-dodger-blue-600 focus:outline-none focus:text-gray-600"
                                            aria-label="Notifications">
                                            <AiOutlineSetting size={25} />
                                        </Link>}
                                </div>
                            }
                        </div>
                        <div className="flex items-center justify-between mt-3 space-x-2">
                            <div className="flex"><span className="mr-1 font-semibold"> {posts.length}  </span> Post</div>
                            <Link href={`/${user?.username}/followers`} className="flex"><span className="mr-1 font-semibold"> {user?.followers?.length}  </span> Followers</Link>
                            <Link href={`/${user?.username}/following`} className="flex"><span className="mr-1 font-semibold"> {user?.following?.length} </span> Following</Link>
                        </div>
                    </div>
                </div>
                <div className="w-full pt-5">
                    <h1 className="text-lg font-semibold text-gray-800 sm:text-xl"> {user?.name}</h1>
                    <p className="text-sm text-gray-800 md:text-base"> {user?.bio} </p>
                    <a href={user?.website} target="/_blank" className="text-sm text-gray-500 md:text-base">{user?.website} </a>
                </div>
            </div>

            <div className="max-w-screen-lg py-6 md:mx-auto flex items-start flex-wrap "  >
                {posts.map((post) => {
                    return (
                        <ExploreCard key={post.id} post={post.data()} postId={post.id} height="h-80" />
                    )
                })}
            </div>
        </>
    )
}