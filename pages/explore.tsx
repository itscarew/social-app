import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'
import Link from 'next/link'
import ExploreCard from '@/components/ExploreCardComponent'

const inter = Inter({ subsets: ['latin'] })

export default function Explore() {
    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <div className='flex items-start flex-wrap ' >
                        <ExploreCard />
                        <ExploreCard />
                        <ExploreCard />
                        <ExploreCard />
                        <ExploreCard />
                        <ExploreCard />
                        <ExploreCard />
                        <ExploreCard />
                        <ExploreCard />
                        <ExploreCard />
                        <ExploreCard />
                        <ExploreCard />
                    </div>

                </div>





            </Layout>
        </>
    )
}
