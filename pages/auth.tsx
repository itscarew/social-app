import AuthComponent from '@/components/AuthComponent'
import AppHead from '@/components/Head'
import { useEffect, useState } from 'react'
import { getAllPosts } from '@/functions'
import FeedCard from '@/components/FeedCompoonent'
import withoutAuth from '@/components/HOC/WithOutAuth'

export default withoutAuth(function Auth() {
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
            <div className='max-w-screen-sm mx-auto mxx:p-0 p-4 ' >
                <h1 className='text-3xl font-normal text-center my-4'>  SocialApp </h1>
                <div className='mb-32' >
                    {[...posts]?.splice(0, 5).map((post) => {
                        return <FeedCard key={post.id} post={post.data()} postId={post.id} />
                    })}
                </div>
                <AuthComponent />
            </div>
        </>
    )
})
