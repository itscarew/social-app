import Layout from '@/components/Layout'
import ExploreCard from '@/components/ExploreCardComponent'
import SuggestCard from '@/components/SuggestCardComponent'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getUserPosts, getAllPosts, getAUser, getOtherUsers } from "@/functions";
import { RootState } from "@/store";

export default function ExplorePeople() {
    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        const subscribe = async () => {
            const users = await getOtherUsers()
            setUsers(users)
        }
        subscribe();
    }, [])

    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <div className='  max-w-screen-sm px-10 py-6 mx-4  rounded-lg md:mx-auto border-1' >
                        <h1 className='text-lg mb-3' >Suggested</h1>

                        {users.map((user) => {
                            return <SuggestCard key={user.id} user={user.data()} userId={user.id} showHandle />
                        })}
                    </div>
                </div>
            </Layout>
        </>
    )
}
