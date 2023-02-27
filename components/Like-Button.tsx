import { likeAPost, unlikeAPost } from "@/functions";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

type ButtonProps = {
    post: any
    postId: any
    subscribeFollowing: any
    addLikeCount: any
    removeLikeCount: any
};

export default function LikeButton({ post, postId, addLikeCount, removeLikeCount }: Partial<ButtonProps>) {
    const authUser = useSelector((state: RootState) => state.user.authUser)

    const checkLikes = () => {
        const likes: [] = post?.likes;
        return likes?.find((l) => l === authUser?.uid);
    };

    const [liked, setLiked] = useState<any>({ [postId]: null })

    useEffect(() => {
        if (authUser.uid && checkLikes()) {
            setLiked({ [postId]: checkLikes() })
        }

    }, [authUser.uid, checkLikes()])

    const unlike = () => {
        unlikeAPost(postId, authUser.uid)
        setLiked({ ...liked, [postId]: null })
        removeLikeCount()

    }

    const like = () => {
        likeAPost(postId, authUser?.uid)
        setLiked({ ...liked, [postId]: authUser.uid })
        addLikeCount()
    }

    return (
        <>
            {(liked && liked[postId]) ? <AiFillHeart size={30} color="red" className="cursor-pointer" onClick={unlike} /> : <AiOutlineHeart size={30} className="cursor-pointer" onClick={like} />}
        </>

    )
}
