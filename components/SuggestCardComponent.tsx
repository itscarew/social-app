import Image from "next/image";
import Link from "next/link";
import FollowButton from "./Follow-Button";

export default function SuggestCard({ user, showHandle }: Partial<any>) {
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
            <FollowButton user={user} />
        </div>


    )
}