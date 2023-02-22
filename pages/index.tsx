import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'
import { app, dataBase } from "../utils/firebaseConfig"
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { getAllPosts, getMyUser } from '@/functions';

export default function Home() {
  const authUser = useSelector((state: RootState) => state.user.authUser)
  const [myUser, setMyUser] = useState<any>()
  const [posts, setPosts] = useState<any>([])

  const following: [] = myUser?.following;


  const followingPosts = following?.map(id => posts?.filter(obj => obj.data().userId === id));

  console.log(followingPosts, "876")



  const subscribe = async () => {
    const user = await getMyUser(authUser?.uid);
    const posts = await getAllPosts()
    setPosts(posts)
    // posts.forEach((post) => {
    //   setPosts(post.data())
    // })

    setMyUser(user.data())
  }
  useEffect(() => {
    subscribe()
  }, [])
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
