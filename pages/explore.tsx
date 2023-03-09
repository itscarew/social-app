import Layout from '@/components/Layout'
import ExploreCard from '@/components/ExploreCardComponent'
import { useState, useEffect } from "react"
import { getAllPosts } from "@/functions";
import Skeleton from 'react-loading-skeleton'
import withAuth from '@/components/HOC/WithAuth';


export default withAuth(function Explore() {
    const [posts, setPosts] = useState<any>([])


    const subscribe = async () => {
        const posts = await getAllPosts()
        setPosts(posts)
    }

    useEffect(() => {
        subscribe();
    }, [])


    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <div className='flex items-start flex-wrap ' >

                        {posts.map((post) => {
                            return (
                                <ExploreCard key={post.id} post={post.data()} postId={post.id} />
                            )
                        })}
                    </div>
                </div>
            </Layout>
        </>
    )
})
