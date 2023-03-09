import '@/styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import type { AppProps } from 'next/app'

import { store } from '../store/index'
import { Provider, useDispatch } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { app, dataBase } from '@/utils/firebaseConfig'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { setAuthUser } from '@/store/slice/authSlice'
import { createUsername } from '@/utils/userNameGenerator'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const userCollection = collection(dataBase, 'users');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        store.dispatch(setAuthUser(user.toJSON()))
        const userRef = doc(userCollection, user.uid);
        const oneDoc: any = await getDoc(userRef)
        if (!oneDoc.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName,
            username: createUsername(user.displayName),
            bio: '',
            website: '',
            email: user.email,
            phone: user.phoneNumber,
            avatar: user.photoURL
          })
        }
        router.push("/")
      } else {
        store.dispatch(setAuthUser(undefined))
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>
  )
}
