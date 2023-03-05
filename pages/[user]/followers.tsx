import Layout from '@/components/Layout'
import SuggestCard from '@/components/SuggestCardComponent'
import { useEffect, useState } from 'react'
import { getAUserByUsername, getUserFollowing } from '@/functions'
import { useRouter } from 'next/dist/client/router'

export default function Followers() {
    const router = useRouter()
    const [user, setUser] = useState<any>()

    //users that are followers
    const [users, setUsers] = useState<any[]>([])

    const followers: [] = user?.followers;

    const subscribe = async () => {
        if (router.query.user) {
            const user = await getAUserByUsername(router.query.user);
            setUser(user?.data())
        }
    }

    useEffect(() => {
        subscribe()
    }, [router.query.user])


    const subscribeFollowing = async () => {
        const users = await getUserFollowing(followers)
        setUsers(users)
    }

    useEffect(() => {
        subscribeFollowing()
    }, [followers])

    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <div className='  max-w-screen-sm px-10 bg-white py-6 mx-4  rounded-lg md:mx-auto border-1' >
                        <h1 className='text-lg mb-3' >Followers</h1>
                        {users?.map((user) => {
                            return <SuggestCard key={user.id} user={user.data()} userId={user.id} showHandle />
                        })}
                    </div>
                </div>
            </Layout>
        </>
    )
}
