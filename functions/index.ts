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

const state = store.getState();
const authUser = state.user.authUser;

const postCollection = collection(dataBase, "posts");
const userCollection = collection(dataBase, "users");
const auth = getAuth(app);
console.log(auth.currentUser?.uid, "ok");

export const getMyUser = async (authUserId) => {
  try {
    const userRef = doc(userCollection, authUserId);
    const oneDoc = await getDoc(userRef);
    return oneDoc;
  } catch (error) {
    throw error;
  }
};

export const getAUserByUsername = async (username) => {
  try {
    const users = query(
      userCollection,
      where("username", "==", username || "")
    );
    const res = await getDocs(users);
    return res.docs[0];
  } catch (error) {
    throw error;
  }
};

export const getOtherUsers = async (authUserId) => {
  console.log(authUser.uid);
  try {
    const users = query(userCollection, where("uid", "!=", authUserId || ""));
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

export const getUserPosts = async (userId) => {
  try {
    const userPosts = query(
      postCollection,
      where("userId", "==", userId || "")
    );
    const res = await getDocs(userPosts);
    return res.docs;
  } catch (error) {
    throw error;
  }
};

export const followAUser = async (userId) => {
  try {
    const followerRef = doc(userCollection, auth.currentUser?.uid || "");
    const followedRef = doc(userCollection, userId);

    await updateDoc(followerRef, {
      following: arrayUnion(userId),
    });
    await updateDoc(followedRef, {
      followers: arrayUnion(auth.currentUser?.uid),
    });
  } catch (error) {
    throw error;
  }
};

export const unfollowAUser = async (userId) => {
  try {
    const followerRef = doc(userCollection, auth.currentUser?.uid || "");
    const followedRef = doc(userCollection, userId);

    await updateDoc(followerRef, {
      following: arrayRemove(userId),
    });
    await updateDoc(followedRef, {
      followers: arrayRemove(auth.currentUser?.uid),
    });
  } catch (error) {
    throw error;
  }
};
