import Image from 'next/image'
import Layout from '@/components/Layout'
import Modal from '@/components/modal'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CommentCard from '@/components/CommentComponenet'
import Link from 'next/link'
import Input from '@/components/Input'
import { IoIosSend } from 'react-icons/io'
import { commentOnPost, getAPost, getAUser } from '@/functions'
import LikeButton from '@/components/Like-Button'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton'

export default function SinglePost() {
    const authUser = useSelector((state: RootState) => state.user.authUser)
    const router = useRouter();
    const postId = router.query.postId

    const [post, setPost] = useState<any>()
    const [user, setUser] = useState<any>()
    const [myUser, setMyUser] = useState<any>()

    const [loading, setLoading] = useState<boolean>(false)

    const [comment, setComment] = useState<string>()
    const [likeCount, setLikeCount] = useState<any>()
    useEffect(() => {
        setLikeCount(post?.likes?.length || 0)
    }, [post])

    const comments: [] = post?.comments

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
        subscribe()
        setComment("")
    }

    const subscribe = async () => {
        setLoading(true)
        try {
            const post = await getAPost(postId)
            const user = await getAUser(post?.data()?.userId)
            if (authUser?.uid) {
                const myUser = await getAUser(authUser?.uid)
                setMyUser(myUser.data())
            }
            setUser(user.data())
            setPost(post.data())
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (postId) {
            subscribe();
        }
    }, [postId])

    const addLikeCount = () => {
        setLikeCount(likeCount + 1)
    }

    const removeLikeCount = () => {
        setLikeCount(likeCount - 1)
    }

    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                </div>
            </Layout>
            <Modal isOpen={!!postId} onClose={() => router.back()} className="max-w-6xl" >
                <div className="relative flex h-[43rem]" >
                    <div className="relative w-6/12" >
                        {post?.picture ? <Image src={post?.picture} alt={post?.picture} fill style={{ objectFit: "contain" }} /> : <Skeleton height={"100%"} width={"100%"} />}
                    </div>
                    <div className="relative flex-1 p-4  overflow-y-scroll  " >
                        <div className="flex items-center text-base border-b border-gray-200 py-2 " >
                            <div className="relative  rounded-full overflow-hidden w-12 h-12 mr-2" >
                                {user?.avatar ? <Image src={user?.avatar} alt={user?.avatar} fill style={{ objectFit: "cover" }} /> : <Skeleton height={50} width={50} borderRadius={50} />}
                            </div>
                            <p className="font-normal"> {user?.username || <Skeleton height={15} width={90} />} </p>
                        </div>

                        <div className='my-6' >
                            <div className='flex items-start justify-between text-base py-0' >
                                <div className="relative rounded-full overflow-hidden w-12 h-12 mr-2" >
                                    {user?.avatar ? <Image src={user?.avatar} alt={user?.avatar} fill style={{ objectFit: "cover" }} /> : <Skeleton height={50} width={50} borderRadius={50} />}
                                </div>
                                <div className="font-semibold w-[88%]">
                                    <Link href={`/${user?.username}`}> {user?.username || <Skeleton height={15} width={90} />} </Link>
                                    <span className='font-normal'>
                                        {post?.text}
                                    </span>
                                    <div className='text-gray-400 text-xs font-thin' >  {post?.createdAt && moment(post?.createdAt).startOf("hour").fromNow()}  </div>
                                </div>
                            </div>

                        </div>

                        {comments?.map((comment, index) => {
                            return (
                                <CommentCard key={index} comment={comment} />
                            )
                        })}

                        <div className='fixed bottom-0 right-0 w-1/2  bg-white z-10 pb-2 ' >
                            {authUser?.uid &&
                                <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                                    <div className="flex items-center gap-5">
                                        <LikeButton post={post} postId={postId} addLikeCount={addLikeCount} removeLikeCount={removeLikeCount} />
                                        <svg className=" cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
                                        <svg className=" cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                                    </div>
                                    <div className="flex">
                                        <svg className=" cursor-pointer" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                                    </div>
                                </div>
                            }
                            <Link href={`/post/${postId}/likes`} className="font-semibold text-sm mx-4 mt-2 mb-4"> {likeCount} likes </Link>
                            {authUser?.uid &&
                                <div>
                                    <Input onChange={handleChange} value={comment} icon={<IoIosSend size={"20"} className='absolute right-3 cursor-pointer' onClick={postComment} />} placeHolder="Post a comment" className="pl-3" />
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

