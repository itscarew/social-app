import { store } from "@/store";
import { app, dataBase } from "@/utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref, getStorage, deleteObject } from "firebase/storage";

const state = store.getState();
const authUser = state.user.authUser;

const postCollection = collection(dataBase, "posts");
const userCollection = collection(dataBase, "users");
const auth = getAuth(app);

export const getAUser = async (userId) => {
  try {
    const userRef = doc(userCollection, userId);
    const oneDoc = await getDoc(userRef);
    return oneDoc;
  } catch (error) {
    throw error;
  }
};

export const getAUserByUsername = async (username) => {
  try {
    const users = query(userCollection, where("username", "==", username));
    const res = await getDocs(users);
    return res.docs[0];
  } catch (error) {
    throw error;
  }
};

export const getOtherUsers = async (authUserId) => {
  console.log(authUser?.uid);
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

export const getAPost = async (postId) => {
  try {
    const postRef = doc(postCollection, postId);
    const oneDoc = await getDoc(postRef);
    return oneDoc;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (userId) => {
  try {
    const userPosts = query(postCollection, where("userId", "==", userId));
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

export const deletePost = async (postId, postPicture) => {
  const storage = getStorage(app);
  const postRef = doc(postCollection, postId);
  const fileRef = ref(storage, postPicture);
  try {
    await deleteDoc(postRef);
    await deleteObject(fileRef);
  } catch (error) {
    throw error;
  }
};

export const commentOnPost = async (postId, payload) => {
  try {
    const postRef = doc(postCollection, postId);

    await updateDoc(postRef, {
      comments: arrayUnion(payload),
    });
  } catch (error) {
    throw error;
  }
};

export const likeAPost = async (postId, userId) => {
  try {
    const postRef = doc(postCollection, postId);

    await updateDoc(postRef, {
      likes: arrayUnion(userId),
    });
  } catch (error) {
    throw error;
  }
};

export const unlikeAPost = async (postId, userId) => {
  try {
    const postRef = doc(postCollection, postId);

    await updateDoc(postRef, {
      likes: arrayRemove(userId),
    });
  } catch (error) {
    throw error;
  }
};

export const getUserFollowers = async (array: []) => {
  try {
    if (array?.length > 0) {
      const followers = query(userCollection, where("uid", "in", array));
      const res = await getDocs(followers);
      return res.docs;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserFollowing = async (array: []) => {
  try {
    if (array?.length > 0) {
      const following = query(userCollection, where("uid", "in", array));
      const res = await getDocs(following);
      return res.docs;
    }
  } catch (error) {
    throw error;
  }
};

export const getPostLikes = async (array: []) => {
  try {
    if (array?.length > 0) {
      const likers = query(userCollection, where("uid", "in", array));
      const res = await getDocs(likers);
      return res.docs;
    }
  } catch (error) {
    throw error;
  }
};

export const getPostsOfFollowing = async (array: []) => {
  try {
    if (array?.length > 0) {
      const posts = query(postCollection, where("userId", "in", array));
      const res = await getDocs(posts);
      return res.docs;
    }
  } catch (error) {
    throw error;
  }
};
