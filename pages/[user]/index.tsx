import Layout from '@/components/Layout'
import ProfileComponent from '@/components/ProfileComponent'
import { getAUserByUsername, getUserPosts } from '@/functions'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'

export default function UserProfile() {
    const router = useRouter()
    const [user, setUser] = useState<any>()
    const [posts, setPosts] = useState<any>([])


    const subscribe = async () => {
        const user = await getAUserByUsername(router.query?.user)
        const userPosts = await getUserPosts(user?.id)
        setUser(user.data())
        setPosts(userPosts)
    }

    useEffect(() => {
        if (router.query?.user) {
            subscribe();
        }
    }, [router.query?.user])

    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <ProfileComponent user={user} posts={posts} />
                </div>
            </Layout>
        </>
    )
}
