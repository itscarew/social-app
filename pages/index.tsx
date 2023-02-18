import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'

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
