import { RootState, store } from "@/store";
import { app, dataBase } from "@/utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const authUser = store.getState().user.authUser;

const postCollection = collection(dataBase, "posts");
const userCollection = collection(dataBase, "users");
const auth = getAuth(app);

export const getAUser = async () => {
  try {
    const userRef = doc(userCollection, authUser?.uid);
    const oneDoc = await getDoc(userRef);
    return oneDoc;
  } catch (error) {
    throw error;
  }
};

export const getOtherUsers = async () => {
  try {
    const users = query(userCollection, where("uid", "!=", authUser?.uid));
    const res = await getDocs(users);
    return res.docs;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const res = await getDocs(postCollection);
    return res.docs;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async () => {
  try {
    const userPosts = query(
      postCollection,
      where("userId", "==", authUser?.uid)
    );
    const res = await getDocs(userPosts);
    return res.docs;
  } catch (error) {
    throw error;
  }
};

export const followAUser = async (userId) => {
  try {
    const followerRef = doc(userCollection, authUser?.uid);
    const followedRef = doc(userCollection, userId);

    await updateDoc(followerRef, {
      following: arrayUnion(userId),
    });
    await updateDoc(followedRef, {
      followers: arrayUnion(authUser.uid),
    });
  } catch (error) {
    throw error;
  }
};

export const unfollowAUser = async (userId) => {
  try {
    const followerRef = doc(userCollection, authUser?.uid);
    const followedRef = doc(userCollection, userId);

    await updateDoc(followerRef, {
      following: arrayRemove(userId),
    });
    await updateDoc(followedRef, {
      followers: arrayRemove(authUser.uid),
    });
  } catch (error) {
    throw error;
  }
};

export const checkFollowing = (userId) => {
  const following: any[] = authUser?.following;
  return following?.find((f) => f === userId);
};
