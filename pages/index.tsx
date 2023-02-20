import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'
import { app, dataBase } from "../utils/firebaseConfig"
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {

  return (
    <>
      <Layout>
        <div className="w-full min-h-screen p-4">

          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
      </Layout>
    </>
  )
}
