import withAuth from '@/components/HOC/WithAuth'
import Layout from '@/components/Layout'
import ProfileComponent from '@/components/ProfileComponent'
import { getAUser, getUserPosts } from '@/functions'
import { RootState } from '@/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default withAuth(function Profile() {
    const authUser = useSelector((state: RootState) => state.user.authUser)
    const modal = useSelector((state: RootState) => state.modal.modal)
    const change = useSelector((state: RootState) => state.change.value)
    const [posts, setPosts] = useState<any>([])
    const [myUser, setMyUser] = useState<any>()

    const subscribe = async () => {
        if (authUser?.uid) {
            const myUser = await getAUser(authUser?.uid)
            const userPosts = await getUserPosts(myUser?.id)
            setMyUser(myUser.data())
            setPosts(userPosts)
        }
    }

    useEffect(() => {
        subscribe();
    }, [authUser?.uid, modal, change])
    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <ProfileComponent user={myUser} posts={posts} />
                </div>
            </Layout>
        </>
    )
})
