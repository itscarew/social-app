// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3fACLM3rWYN5DcpzeodrSNHzD7Ca1OaU",
  authDomain: "social-app-dd665.firebaseapp.com",
  databaseURL: "https://social-app-dd665-default-rtdb.firebaseio.com",
  projectId: "social-app-dd665",
  storageBucket: "social-app-dd665.appspot.com",
  messagingSenderId: "442739728338",
  appId: "1:442739728338:web:8fe89f4fe895c5a128b20b",
  measurementId: "G-9J78JRJRPF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
// const analytics = getAnalytics(app);
