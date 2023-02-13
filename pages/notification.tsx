import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'
import NotificationCard from '@/components/NotificationComponents'

const inter = Inter({ subsets: ['latin'] })

export default function Notification() {
    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <h1 className='mb-6' >Notifications</h1>
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                </div>
            </Layout>
        </>
    )
}
