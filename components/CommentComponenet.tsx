import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai"

export default function CommentCard({ data }: Partial<any>) {
    return (
        <div className='my-6' >
            <div className='flex items-start justify-between text-base py-0' >
                <div className="relative rounded-full overflow-hidden w-12 h-12 mr-2" >
                    <Image src={"/pic1.jpeg"} alt="#" fill style={{ objectFit: "cover" }} />
                </div>
                <p className="font-semibold w-[88%]"> <Link href={"/ororko"}> @itsmeieijij </Link> <span className='font-normal'> Check out the brand-new teaser poster
                    for Marvel Studios’ The Marvels,
                    coming to theaters November 10. </span>
                </p>
            </div>
            <div className="flex items-center mt-1" >
                <small className='ml-16 text-gray-400' >53m</small>
                <small className='ml-4 text-gray-400' >839 likes</small>
                <small className='ml-2 text-gray-400 cursor-pointer ' > <AiOutlineLike size={13} /> </small>
            </div>
        </div>

    )
}