import Image from "next/image";
import Input from "./Input";
import { IoIosSend } from "react-icons/io"
import Link from "next/link";
import { useRouter } from "next/router";
import { BsHeart } from "react-icons/bs"

export default function FeedCard() {
    const router = useRouter()
    return (
        <div className="bg-white border rounded-sm mx-auto mb-8 ">
            <div className="flex items-center px-4 py-3">
                <Image className="h-8 w-8 rounded-full" src="/pic1.jpeg" alt="#" width={50} height={50} />
                <div className="ml-3 ">
                    <Link href={`/8fact`} className="text-sm font-semibold antialiased block leading-tight">8fact</Link>
                    <span className="text-gray-600 text-xs block">Asheville, North Carolina</span>
                </div>
            </div>
            <div className="w-full relative " style={{ height: "40rem" }} >
                <Image alt="#" src="/pic1.jpeg" fill style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
            <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                <div className="flex items-center gap-5">
                    <BsHeart size={23} className="cursor-pointer" />
                    <svg className=" cursor-pointer" onClick={() => router.push(`/post/okoko`)} fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
                    <svg className=" cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                </div>
                <div className="flex">
                    <svg className=" cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                </div>
            </div>
            <div className="font-semibold text-sm mx-4 mt-2 mb-4">92,372 likes</div>
            <div>
                <Input icon={<IoIosSend size={"20"} className='absolute right-3 cursor-pointer' />} placeHolder="Post a comment" className="pl-3" />
            </div>
        </div>


    )
}