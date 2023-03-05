import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { getAUser, getPostsOfFollowing, getUserPosts } from '@/functions';

export default function Home() {
  const authUser = useSelector((state: RootState) => state.user.authUser)
  const [myUser, setMyUser] = useState<any>()
  const [posts, setPosts] = useState<any>([])
  const [userPosts, setUserPosts] = useState<any>([])

  const following: [] = myUser?.following;

  const subscribe = async () => {
    if (authUser?.uid) {
      const user = await getAUser(authUser?.uid);
      setMyUser(user.data())
    }
  }

  useEffect(() => {
    subscribe()
  }, [authUser?.uid])


  const subscribeFollowing = async () => {
    if (myUser?.uid) {
      const posts = await getPostsOfFollowing(following)
      const userPosts = await getUserPosts(myUser?.uid)
      setUserPosts(userPosts)
      setPosts(posts)
    }
  }

  useEffect(() => {
    subscribeFollowing()
  }, [following])

  return (
    <>
      <Layout>
        <div className="w-full min-h-screen p-4">
          {[...posts, ...userPosts]?.map((post) => {
            return <FeedCard key={post.id} post={post.data()} postId={post.id} authUserId={authUser.uid} />
          })}
        </div>
      </Layout>
    </>
  )
}
