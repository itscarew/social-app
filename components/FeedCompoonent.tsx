import Image from "next/image";
import Input from "./Input";
import { IoIosSend } from "react-icons/io"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { commentOnPost, getAUser } from "@/functions";
import LikeButton from "./Like-Button";
import moment from "moment";
import Skeleton from 'react-loading-skeleton'

export default function FeedCard({ post, postId, authUserId }: Partial<any>) {
    const router = useRouter()
    const [user, setUser] = useState<any>()
    const [myUser, setMyUser] = useState<any>()

    const [comment, setComment] = useState<string>()
    const [likeCount, setLikeCount] = useState<number>(post.likes?.length || 0)

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    const postComment = async () => {
        const payload = {
            username: myUser?.username,
            userId: myUser?.uid,
            avatar: myUser?.avatar,
            comment: comment,
            createdAt: moment().format()
        }
        await commentOnPost(postId, payload)
        setComment("")
    }

    const subscribe = async () => {
        if (post?.userId) {
            const user = await getAUser(post?.userId);
            setUser(user.data())
            if (authUserId) {
                const myUser = await getAUser(authUserId)
                setMyUser(myUser.data())
            }
        }
    }

    useEffect(() => {
        subscribe()
    }, [post?.userId])

    const addLikeCount = () => {
        setLikeCount(likeCount + 1)
    }

    const removeLikeCount = () => {
        setLikeCount(likeCount - 1)
    }

    return (
        <div className="bg-white border rounded-sm mx-auto mb-8 pb-2 ">
            <div className="flex items-center px-4 py-3">
                {user?.avatar ? <Image className="h-8 w-8 rounded-full" src={user?.avatar} alt={user?.avatar} width={50} height={50} /> : <Skeleton height={50} width={50} borderRadius={50} />}
                <div className="ml-3 ">
                    {user?.username ? <Link href={`/${user?.username}`} className="text-sm font-semibold antialiased block leading-tight"> {user?.username} <span> &#x2022;  {post?.createdAt && moment(post?.createdAt).startOf("milliseconds").fromNow()} </span> </Link> : <Skeleton height={15} width={90} />}
                    <p className="text-gray-600 text-xs block">{post?.location}</p>
                </div>
            </div>
            <div className="w-full relative h-[40rem]" >
                {post?.picture ? <Image alt={post?.picture} src={post?.picture} fill style={{ objectFit: "contain", objectPosition: "center" }} /> : <Skeleton height={"40rem"} width={"100%"} />}
            </div>
            {authUserId &&
                <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                    <div className="flex items-center gap-5">
                        <LikeButton post={post} postId={postId} addLikeCount={addLikeCount} removeLikeCount={removeLikeCount} />
                        <svg className=" cursor-pointer" onClick={() => router.push(`/post/${postId}`)} fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
                        <svg className=" cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                    </div>
                </div>}
            <Link href={`/post/${postId}/likes`} className="font-semibold text-sm mx-4 mt-2 mb-1"> {likeCount ? `${likeCount} likes ` : `0 likes`}  </Link>
            <div className='flex items-start justify-between text-base py-0 mx-4' >
                {post?.text ? <p className="font-semibold w-[88%]"> <Link href={`/${user?.username}`}  > {user?.username} </Link> <span className='font-normal'> {post?.text} </span>
                </p> : <Skeleton height={15} width={90} />}
            </div>
            {post.comments && <Link href={`/post/${postId}`} className="font-semibold text-gray-500 text-sm mx-4 mt-0 mb-1"> {post.comments?.length > 1 ? `View all ${post?.comments?.length} comments` : `View ${post?.comments?.length} comment`}  </Link>}
            {authUserId &&
                <div>
                    <Input onChange={handleChange} value={comment} icon={<IoIosSend size={"20"} className='absolute right-3 cursor-pointer' onClick={postComment} />} placeHolder="Post a comment" className="pl-3" />
                </div>}
        </div>
    )
}