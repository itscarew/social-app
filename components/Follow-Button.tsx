type ButtonProps = {
    user: any
    buttonType: any
};

import { followAUser, getAUser, unfollowAUser } from "@/functions";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function FollowButton({ user, buttonType }: Partial<ButtonProps>) {
    const authUser = useSelector((state: RootState) => state.user.authUser)
    const [myUser, setMyUser] = useState<any>()

    const subscribe = async () => {
        const user = await getAUser(authUser?.uid);
        setMyUser(user.data())
    }
    useEffect(() => {
        subscribe()
    }, [])

    const checkFollowing = (userId) => {
        const following: [] = myUser?.following;
        return following?.find((f) => f === userId);
    };

    const unfollow = () => {
        unfollowAUser(user?.uid)
        subscribe()
    }

    const follow = () => {
        followAUser(user?.uid)
        subscribe()
    }
    return (
        <div className={`text-sm cursor-pointer p-2 rounded-lg ${buttonType ? " bg-dodger-blue-500 text-white " : "text-dodger-blue-500 bg-transparent"} `} onClick={checkFollowing(user?.uid) ? unfollow : follow} > {checkFollowing(user?.uid) ? "Unfollow" : "Follow"}</div>
    )
}