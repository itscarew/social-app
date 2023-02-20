import Layout from '@/components/Layout'
import ExploreCard from '@/components/ExploreCardComponent'
import { useState, useEffect } from "react"
import { getUserPosts, getAllPosts, getAUser } from "@/functions";
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/index'

export default function Explore() {
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
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <div className='flex items-start flex-wrap ' >

                        {posts.map((post) => {
                            return (
                                <ExploreCard key={post.id} posts={post.data()} />
                            )
                        })}
                    </div>

                </div>





            </Layout>
        </>
    )
}
