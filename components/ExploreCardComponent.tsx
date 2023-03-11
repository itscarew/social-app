import Image from "next/image";
import Link from "next/link";
import { BsHeart } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"
import { RiDeleteBinLine } from "react-icons/ri"
import DeleteButton from "./DeleteButton";

export default function ExploreCard({ height, post, postId }: Partial<any>) {
    return (
        <div className={`relative md:w-1/3 w-1/2 ${height} h-96 p-2 `}>
            <DeleteButton post={post} postId={postId} postUserId={post.userId} />
            <div className='relative w-full h-full' >
                <Link href={`/post/${postId}`} >
                    <div className="bg-black absolute top-0 text-white left-0 w-full h-full z-10 flex items-center justify-center opacity-0 hover:opacity-50  "   >
                        <div className="flex items-center" > <BsHeart size={25} color="#fff" /> <p className="mx-2"> {post.likes?.length || 0} </p> </div>
                        <div className="flex items-center" > <FaRegComment size={25} color="white" /> <p className="ml-2" > {post.comments?.length || 0}   </p> </div>
                    </div>
                    <Image alt="#" src={post?.picture} fill style={{ objectFit: "cover", objectPosition: "center" }} />
                </Link>
            </div>
        </div>
    )
}