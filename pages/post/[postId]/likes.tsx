import Layout from '@/components/Layout'
import SuggestCard from '@/components/SuggestCardComponent'
import { useEffect, useState } from 'react'
import { getAPost, getAUserByUsername, getPostLikes, getUserFollowing } from '@/functions'
import { useRouter } from 'next/dist/client/router'

export default function Following() {
    const router = useRouter()
    const [post, setPost] = useState<any>()

    //users that liked
    const [users, setUsers] = useState<any[]>([])

    const likes: [] = post?.likes;

    const subscribe = async () => {
        if (router.query.postId) {
            const post = await getAPost(router.query.postId);
            setPost(post?.data())
        }
    }

    useEffect(() => {
        subscribe()
    }, [router.query.postId])


    const subscribeLikes = async () => {
        const users = await getPostLikes(likes)
        setUsers(users)
    }

    useEffect(() => {
        subscribeLikes()
    }, [likes])

    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <div className='  max-w-screen-sm px-10 bg-white py-6 mx-4  rounded-lg md:mx-auto border-1' >
                        <h1 className='text-lg mb-3' >Likers</h1>
                        {users?.map((user) => {
                            return <SuggestCard key={user.id} user={user.data()} userId={user.id} showHandle />
                        })}
                    </div>
                </div>
            </Layout>
        </>
    )
}
