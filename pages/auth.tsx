import AuthComponent from '@/components/AuthComponent'
import AppHead from '@/components/Head'
import { useEffect, useState } from 'react'
import { getAllPosts } from '@/functions'
import FeedCard from '@/components/FeedCompoonent'
import Link from 'next/dist/client/link'

export default function Auth() {
    const [posts, setPosts] = useState<any>([])

    useEffect(() => {
        const subscribe = async () => {
            const posts = await getAllPosts()
            setPosts(posts)
        }
        subscribe();
    }, [])

    return (
        <>
            <AppHead />
            <div className='max-w-screen-sm mx-auto' >
                <h1 className='text-3xl font-normal text-center my-4  '>  SocialApp </h1>
                {[...posts]?.map((post) => {
                    return <FeedCard key={post.id} post={post.data()} postId={post.id} />
                })}
                <AuthComponent />
            </div>
        </>
    )
}
