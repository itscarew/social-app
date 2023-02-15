import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'
import { AiOutlineSetting } from "react-icons/ai"
import ExploreCard from '@/components/ExploreCardComponent'
import ProfileComponent from '@/components/ProfileComponent'

const inter = Inter({ subsets: ['latin'] })

export default function UserProfile() {
    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <ProfileComponent />
                </div>
            </Layout>
        </>
    )
}
