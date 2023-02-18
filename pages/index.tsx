import Layout from '@/components/Layout'
import FeedCard from '@/components/FeedCompoonent'
import { app, dataBase } from "../utils/firebaseConfig"
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Button from '@/components/Button';
import { useEffect, useState } from "react"

export default function Home() {

  const userCollection = collection(dataBase, 'users');

  const addUser = async () => {
    await addDoc(userCollection, {
      firstName: "Holmes",
      lastName: "Carter"
    })
    getUsers()
  }

  const [users, setUsers] = useState<any>([])
  const getUsers = async () => {
    const res = await getDocs(userCollection)
    setUsers(res.docs)
  }

  useEffect(() => {
    getUsers()
  }, [])


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
