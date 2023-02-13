
import Image from "next/image";
import ExploreCard from "./ExploreCardComponent";
import { AiOutlineSetting } from "react-icons/ai"
import Link from "next/link";

export default function ProfileComponent() {
    return (
        <>
            <div className=" max-w-screen-lg px-10 py-6 mx-4 bg-white rounded-lg shadow md:mx-auto border-1">
                <div className="flex flex-col items-start w-full m-auto sm:flex-row">
                    <div className="flex mx-auto sm:mr-10 sm:m-0">
                        <div className="relative items-center justify-center w-20 h-20 m-auto mr-4 sm:w-32 sm:h-32">
                            <Image alt="profil"
                                src="/pic1.jpeg"
                                className="object-cover w-20 h-20 mx-auto rounded-full sm:w-32 sm:h-32" fill />
                        </div>
                    </div>
                    <div className="flex flex-col pt-4 mx-auto my-auto sm:pt-0 sm:mx-0">
                        <div className="flex flex-col mx-auto sm:flex-row sm:mx-0 ">
                            <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl">AlexNoah7</h2>
                            <div className="flex">
                                <Link
                                    href={"/settings"}
                                    className="flex items-center px-4 text-sm font-medium text-gray-900 bg-transparent border border-gray-600 rounded outline-none sm:ml-2 hover:bg-blue-600 hover:text-white focus:outline-none hover:border-blue-700">Edit
                                    profile</Link>
                                <Link href={"/settings"} className="p-1 ml-2 text-gray-700 border-transparent rounded-full cursor-pointer hover:text-blue-600 focus:outline-none focus:text-gray-600"
                                    aria-label="Notifications">
                                    <AiOutlineSetting size={25} />
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 space-x-2">
                            <div className="flex"><span className="mr-1 font-semibold">55 </span> Post</div>
                            <div className="flex"><span className="mr-1 font-semibold">10k </span> Follower</div>
                            <div className="flex"><span className="mr-1 font-semibold">20</span> Following</div>
                        </div>
                    </div>
                </div>
                <div className="w-full pt-5">
                    <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">Alexander Noah</h1>
                    <p className="text-sm text-gray-500 md:text-base">Fotografer</p>
                    <p className="text-sm text-gray-800 md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cupiditate, quam?</p>
                </div>
            </div>

            <div className="max-w-screen-lg py-6 md:mx-auto flex items-start flex-wrap  h "  >
                <ExploreCard height="h-80" />
                <ExploreCard height="h-80" />
                <ExploreCard height="h-80" />
                <ExploreCard height="h-80" />
                <ExploreCard height="h-80" />
                <ExploreCard height="h-80" />


            </div>
        </>
    )
}