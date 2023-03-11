import Image from 'next/image'
import Layout from '@/components/Layout'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Link from 'next/link'
import { getAUser } from '@/functions'
import { useState, useEffect } from "react"
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { dataBase } from '@/utils/firebaseConfig'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/index'
import Skeleton from 'react-loading-skeleton'
import withAuth from '@/components/HOC/WithAuth'
import { AiOutlineCheck } from "react-icons/ai"


export default withAuth(function Settings() {
    const authUser = useSelector((state: RootState) => state.user.authUser)
    const [data, setData] = useState({ name: "", username: "", email: "", bio: "", phone: "", website: "" })


    const subscribe = async () => {
        if (authUser?.uid) {
            const myUser = await getAUser(authUser?.uid)
            setData({
                ...data,
                name: myUser.data()?.name,
                username: myUser.data()?.username,
                email: myUser.data()?.email,
                bio: myUser.data()?.bio,
                phone: myUser.data()?.phone,
                website: myUser.data()?.website
            })
        }
    }
    useEffect(() => {
        subscribe();
    }, [authUser?.uid])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const [updated, setUpdated] = useState<boolean>(false)
    const userCollection = collection(dataBase, 'users');
    const update = async (e) => {
        e.preventDefault()
        const userRef = doc(userCollection, authUser?.uid);
        const oneDoc = await getDoc(userRef)
        if (oneDoc.exists()) {
            setDoc(userRef, {
                name: data.name,
                username: data.username,
                bio: data.bio,
                website: data.website,
                email: data.email,
                phone: data.phone
            }, { merge: true })
            setUpdated(true)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setUpdated(false)
        }, 2000)
    }, [updated])



    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <div className='max-w-screen-lg md:px-10 px-5 py-6 bg-white rounded-lg shadow mx-auto border-1' >
                        <div className="flex items-center text-base py-6" >
                            <Link href={"/profile"} className="relative  rounded-full overflow-hidden w-14 h-14 mr-2" >
                                {authUser.photoURL ? <Image src={authUser.photoURL} alt={authUser.photoURL} fill style={{ objectFit: "cover" }} /> : <Skeleton height={50} width={50} borderRadius={50} />}
                            </Link>
                            <Link href={"/profile"}>
                                <p className='font-normal' > {data?.name || <Skeleton height={15} width={90} />} </p>
                                <p className="font-normal " > {data?.username || <Skeleton height={15} width={90} />} </p>
                            </Link>
                        </div>
                        <form onSubmit={update}>
                            <div className='md:w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3 text-left '>Name</label>
                                <div className='w-4/5'>
                                    <Input value={data?.name} name={"name"}
                                        onChange={handleChange}
                                        rounded className="pl-2 border-2 " />
                                </div>
                            </div>
                            <div className='md:w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3 text-left'>Username</label>
                                <div className='w-4/5'><Input value={data?.username} name={"username"}
                                    onChange={handleChange} rounded className="pl-2 border-2 " /></div>
                            </div>
                            <div className='md:w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Website</label>
                                <div className='w-4/5'><Input value={data?.website} name={"website"}
                                    onChange={handleChange} rounded className="pl-2 border-2 " /></div>
                            </div>

                            <div className='md:w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Bio</label>
                                <div className='w-4/5'>
                                    <textarea value={data?.bio} name={"bio"}
                                        onChange={handleChange} className={`w-full pl-2 h-24 outline-none rounded-lg py-2 border border-gray-300 focus:outline-none  focus:border-gray-400 `} />
                                </div>
                            </div>

                            <h1 className='text-lg font-normal mb-4' >Personal Information</h1>

                            <div className='md:w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Email Address</label>
                                <div className='w-4/5'><Input value={data?.email} name={"email"}
                                    onChange={handleChange} rounded className="pl-2 border-2 " readOnly /></div>
                            </div>
                            <div className='md:w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Phone Number</label>
                                <div className='w-4/5'><Input value={data?.phone} name={"phone"}
                                    onChange={handleChange} rounded className="pl-2 border-2 " /></div>
                            </div>

                            <Button className={`${updated ? "bg-green-500" : "bg-dodger-blue-500"} text-white h-11 w-32`} > {updated ? <AiOutlineCheck size={25} /> : "Submit"} </Button>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
})
