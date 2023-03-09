import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { getAUser, getPostsOfFollowing, getUserPosts } from '@/functions';
import Button from '@/components/Button';
import { openModal } from '@/store/slice/modalSlice';
import withAuth from '@/components/HOC/WithAuth';

export default withAuth(function Home() {
  const dispatch = useDispatch()
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

  const handleCreate = () => {
    dispatch(openModal())
  }

  const postsToShow = posts ? [...posts, ...userPosts] : [...userPosts]
  return (
    <>
      <Layout>
        <div className="w-full min-h-screen p-4">

          {postsToShow.length > 1 ?
            postsToShow?.map((post) => {
              return <FeedCard key={post.id} post={post.data()} postId={post.id} authUserId={authUser?.uid} />
            }) :
            <div className='text-center text-2xl font-thin flex flex-col justify-center items-center ' >
              <p>Your posts and posts of people you follow will appear here !. </p>
              <Button onClick={handleCreate} className="bg-gray-500 text-lg text-white mt-5 p-1">Create Post</Button>
            </div>}
        </div>
      </Layout>
    </>
  )
})
