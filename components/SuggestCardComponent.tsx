import Image from "next/image";
import Link from "next/link";
import { FcLike } from "react-icons/fc"
import { FaRegComment } from "react-icons/fa"
import CommentCard from "./CommentComponenet";
import Button from "./Button";

export default function SuggestCard({ showHandle }: Partial<any>) {
    return (
        <div className="flex items-center justify-between" >
            <div className="flex items-center text-base py-1.5 " >
                <Link href={"/okokoko"} className="relative  rounded-full overflow-hidden w-10 h-10 mr-2" >
                    <Image src={"/pic1.jpeg"} alt="#" fill style={{ objectFit: "cover" }} />
                </Link>
                <Link href={"/kokokok"} >
                    <p className=' font-medium ' >Olivia Rhye</p>
                    {showHandle && <p className="font-normal" >@itsmeieijij</p>}
                </Link>
            </div>
            <div className=" text-dodger-blue-500 text-sm cursor-pointer" >Follow</div>
        </div>


    )
}