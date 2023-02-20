import { app, dataBase } from "@/utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const postCollection = collection(dataBase, "posts");
const userCollection = collection(dataBase, "users");
const auth = getAuth(app);

export const getAUser = async () => {
  try {
    const userRef = doc(userCollection, auth.currentUser?.uid);
    const oneDoc = await getDoc(userRef);
    return oneDoc;
  } catch (error) {
    throw error;
  }
};

export const getOtherUsers = async () => {
  try {
    const users = query(
      userCollection,
      where("uid", "!=", auth?.currentUser?.uid)
    );
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
      where("userId", "==", auth?.currentUser?.uid)
    );
    const res = await getDocs(userPosts);
    return res.docs;
  } catch (error) {
    throw error;
  }
};

// export const getAPosts = async () => {
//   const res = await getDocs(postCollection);
//   return res.docs;
// };
