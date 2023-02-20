import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "@/store";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { dataBase } from "@/utils/firebaseConfig";

export default function SuggestCard({ user, showHandle, userId }: Partial<any>) {
    const authUser = useSelector((state: RootState) => state.user)
    const userCollection = collection(dataBase, 'users');

    const follow = async () => {
        try {
            const followerRef = doc(userCollection, authUser.authUser.uid);
            const followedRef = doc(userCollection, userId);

            await updateDoc(followerRef, {
                following: arrayUnion(userId)
            });
            await updateDoc(followedRef, {
                followers: arrayUnion(authUser.authUser.uid)
            });

        } catch (error) {
            throw error
        }
    }

    return (
        <div className="flex items-center justify-between" >
            <div className="flex items-center text-base py-1.5 " >
                <Link href={`/${user?.username}`} className="relative  rounded-full overflow-hidden w-10 h-10 mr-2" >
                    <Image src={user?.avatar} alt="#" fill style={{ objectFit: "cover" }} />
                </Link>
                <Link href={`/${user?.username}`}  >
                    <p className=' font-medium ' > {user?.name} </p>
                    {showHandle && <p className="font-normal" >{user?.username} </p>}
                </Link>
            </div>
            <div className=" text-dodger-blue-500 text-sm cursor-pointer" onClick={follow} >Follow</div>
        </div>


    )
}