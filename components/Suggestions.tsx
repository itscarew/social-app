
import Image from "next/image";
import Link from "next/link";
import { FcLike } from "react-icons/fc"
import { FaRegComment } from "react-icons/fa"
import CommentCard from "./CommentComponenet";
import Button from "./Button";
import SuggestCard from "./SuggestCardComponent";

export default function Suggestions({ height }: Partial<any>) {
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
            <SuggestCard />
            <SuggestCard />
            <SuggestCard />
            <SuggestCard />
            <SuggestCard />
            <SuggestCard />
        </div>

    )
}