import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'
import Input from '@/components/Input'
import Button from '@/components/Button'

const inter = Inter({ subsets: ['latin'] })

export default function Settings() {
    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <div className='max-w-screen-lg px-10 py-6 mx-4 bg-white rounded-lg shadow md:mx-auto border-1' >

                        <div className="flex items-centerr text-base py-6 " >
                            <a href={"/profile"} className="relative  rounded-full overflow-hidden w-14 h-14 mr-2" >
                                <Image src={"/pic1.jpeg"} alt="#" fill style={{ objectFit: "cover" }} />
                            </a>
                            <a>
                                <p className='font-normal' >Olivia Rhye</p>
                                <p className="font-normal text-dodger-blue-500" >@itsmeieijij</p>
                            </a>
                        </div>

                        <form>
                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3 text-left '>Name</label>
                                <div className='w-4/5'><Input rounded className="pl-2 border-2 " /></div>
                            </div>
                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3 text-left'>Username</label>
                                <div className='w-4/5'><Input rounded className="pl-2 border-2 " /></div>
                            </div>
                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Website</label>
                                <div className='w-4/5'><Input rounded className="pl-2 border-2 " /></div>
                            </div>

                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Bio</label>
                                <div className='w-4/5'>
                                    <textarea className={`w-full outline-none rounded-lg py-2 border border-gray-300 focus:outline-none  focus:border-gray-400 `} /></div>
                            </div>

                            <h1 className='text-lg font-normal mb-4' >Personal Information</h1>

                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Email Address</label>
                                <div className='w-4/5'><Input rounded className="pl-2 border-2 " /></div>
                            </div>
                            <div className='w-2/3 flex items-center justify-between mb-6 ' >
                                <label className='mr-3'>Phone Number</label>
                                <div className='w-4/5'><Input rounded className="pl-2 border-2 " /></div>
                            </div>

                            <Button className=' bg-dodger-blue-500 text-white  py-4 px-16' >Submit</Button>
                        </form>
                    </div>
                </div>




            </Layout>
        </>
    )
}
