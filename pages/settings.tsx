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


export default function Settings() {
    const authUser = useSelector((state: RootState) => state.user.authUser)
    const [data, setData] = useState({ name: "", username: "", email: "", bio: "", phone: "", website: "" })


    const subscribe = async () => {
        if (authUser.uid) {
            const myUser = await getAUser(authUser.uid)
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
    }, [authUser.uid])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

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
        }
    }

    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <div className='max-w-screen-lg px-10 py-6 mx-4 bg-white rounded-lg shadow md:mx-auto border-1' >
                        <div className="flex items-centerr text-base py-6 " >
                            <Link href={"/profile"} className="relative  rounded-full overflow-hidden w-14 h-14 mr-2" >
                                {authUser.photoURL ? <Image src={authUser.photoURL} alt={authUser.photoURL} fill style={{ objectFit: "cover" }} /> : <Skeleton height={50} width={50} borderRadius={50} />}
                            </Link>
                            <Link href={"/profile"}>
                                <p className='font-normal' > {data?.name || <Skeleton height={15} width={90} />} </p>
                                <p className="font-normal " > {data?.username || <Skeleton height={15} width={90} />} </p>
                            </Link>
                        </div>
                        <form onSubmit={update}>
                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3 text-left '>Name</label>
                                <div className='w-4/5'>
                                    <Input value={data?.name} name={"name"}
                                        onChange={handleChange}
                                        rounded className="pl-2 border-2 " />
                                </div>
                            </div>
                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3 text-left'>Username</label>
                                <div className='w-4/5'><Input value={data?.username} name={"username"}
                                    onChange={handleChange} rounded className="pl-2 border-2 " /></div>
                            </div>
                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Website</label>
                                <div className='w-4/5'><Input value={data?.website} name={"website"}
                                    onChange={handleChange} rounded className="pl-2 border-2 " /></div>
                            </div>

                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Bio</label>
                                <div className='w-4/5'>
                                    <textarea value={data?.bio} name={"bio"}
                                        onChange={handleChange} className={`w-full pl-2 h-24 outline-none rounded-lg py-2 border border-gray-300 focus:outline-none  focus:border-gray-400 `} />
                                </div>
                            </div>

                            <h1 className='text-lg font-normal mb-4' >Personal Information</h1>

                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Email Address</label>
                                <div className='w-4/5'><Input value={data?.email} name={"email"}
                                    onChange={handleChange} rounded className="pl-2 border-2 " readOnly /></div>
                            </div>
                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Phone Number</label>
                                <div className='w-4/5'><Input value={data?.phone} name={"phone"}
                                    onChange={handleChange} rounded className="pl-2 border-2 " /></div>
                            </div>

                            <Button className=' bg-dodger-blue-500 text-white  py-4 px-16' >Submit</Button>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
