import Layout from '@/components/Layout'
import SuggestCard from '@/components/SuggestCardComponent'
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { getOtherUsers } from "@/functions";
import { RootState } from "@/store";
import withAuth from '@/components/HOC/WithAuth';

export default withAuth(function ExplorePeople() {
    const authUser = useSelector((state: RootState) => state.user.authUser)
    const [users, setUsers] = useState<any[]>([])

    const subscribe = async () => {
        if (authUser?.uid) {
            const users = await getOtherUsers(authUser?.uid)
            setUsers(users)
        }
    }

    useEffect(() => {
        subscribe();
    }, [authUser?.uid])

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
})
