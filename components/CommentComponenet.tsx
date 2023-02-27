import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai"

export default function CommentCard({ comment }: Partial<any>) {
    console.log(comment)
    return (
        <div className='my-6' >
            <div className='flex items-start justify-between text-base py-0' >
                <div className="relative rounded-full overflow-hidden w-12 h-12 mr-2" >
                    <Image alt={comment?.avatar} src={comment?.avatar} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="font-semibold w-[88%]"> <Link href={`/${comment.username}`}> {comment?.username}</Link> <span className='font-normal'> {comment?.comment}</span>
                    <div className="flex items-center mt-1 text-gray-400 text-xs font-thin" >
                        <p>53m</p>
                        <p className='ml-4'>0 likes</p>
                        <p className='ml-2 cursor-pointer'> <AiOutlineLike size={13} /> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}