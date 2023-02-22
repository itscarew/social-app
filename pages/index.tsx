import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { getAllPosts, getMyUser } from '@/functions';

export default function Home() {
  const authUser = useSelector((state: RootState) => state.user.authUser)
  const [myUser, setMyUser] = useState<any>()
  const [posts, setPosts] = useState<any>([])

  const following: [] = myUser?.following;

  const followingPosts = following?.map(id => posts?.filter(obj => obj.data().userId === id))

  const subscribe = async () => {
    if (authUser?.uid) {
      const user = await getMyUser(authUser?.uid);
      const posts = await getAllPosts()
      setPosts(posts)
      setMyUser(user.data())
    }
  }

  useEffect(() => {
    subscribe()
  }, [authUser?.uid])
  return (
    <>
      <Layout>
        <div className="w-full min-h-screen p-4">

          {followingPosts && followingPosts[0]?.map((post) => {
            return <FeedCard key={post.id} post={post.data()} />
          })}


        </div>
      </Layout>
    </>
  )
}
