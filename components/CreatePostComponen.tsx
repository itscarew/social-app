import Image from "next/image";
import { FcStackOfPhotos } from "react-icons/fc"
import Button from "./Button";
import { useState, useEffect } from "react"
import { getStorage, getBytes, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage"
import { TfiClose } from "react-icons/tfi"
import { app, dataBase, storage } from "@/utils/firebaseConfig";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function CreatePostComponent() {
    const auth = getAuth(app);
    const [post, setPost] = useState({ text: "", picture: "", pictureUrl: null })

    const handleChange = (e) => {
        setPost({ ...post, text: e.target.value })
    }

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        const selectedFileUrl = URL.createObjectURL(selectedFile);
        setPost({ ...post, picture: selectedFile, pictureUrl: selectedFileUrl });
    }

    const refreshPicture = () => {
        setPost({ ...post, picture: "", pictureUrl: null });
    }

    const submitPost = async (text, file) => {
        // Create a unique filename for the uploaded picture
        const filename = `${Date.now()}-${file.name}`;
        // Create a reference to the storage location for the picture
        const pictureRef = ref(storage, `pictures/${filename}`);
        // Upload the file to Firestore storage
        const snapshot = await uploadBytesResumable(pictureRef, file);
        // Get the download URL for the uploaded picture
        const downloadURL = await getDownloadURL(snapshot.ref);
        // Add the post to the Firestore collection with the text and picture download URL
        const newPost = {
            text,
            location: "",
            picture: downloadURL,
            userId: auth.currentUser.uid
        };
        const postCollection = collection(dataBase, 'posts');
        const docRef = await addDoc(postCollection, newPost);
        // Return the ID of the new post in the Firestore collection
        return docRef.id;
    };


    const creatPost = async () => {
        const postId = await submitPost(post.text, post.picture);
        console.log(`Post submitted with ID: ${postId}`);
    };


    return (
        <>
            <div className="flex h-[30rem]" >
                {!post.pictureUrl &&
                    <div className="relative w-7/12 flex flex-col items-center justify-center" >
                        <FcStackOfPhotos size={120} />
                        <p className="text-xl" >Bring your photos here</p>
                        <label className=' bg-dodger-blue-500 text-white py-2 px-8 mt-4 rounded-lg cursor-pointer'>
                            <span className="mt-2 text-base leading-normal">Lets see your computer</span>
                            <input type='file' onChange={handleFileUpload} className="hidden" />
                        </label>
                    </div>
                }
                {post.pictureUrl &&
                    <div className="relative w-7/12" >
                        <div onClick={refreshPicture} className="z-30 absolute top-5 right-5 bg-slate-400 rounded-full p-2 cursor-pointer" > <TfiClose size={15} color="#fff" /> </div>
                        <div className="w-full" >
                            <Image src={post.pictureUrl} alt="#" fill style={{ objectFit: "cover" }} />
                        </div>
                    </div>
                }
                <div className="flex-1 p-4 " >
                    <div className="flex items-center text-base py-6 " >
                        <div className="relative  rounded-full overflow-hidden w-12 h-12 mr-2" >
                            <Image src={"/pic1.jpeg"} alt="#" fill style={{ objectFit: "cover" }} />
                        </div>
                        <p className="font-normal">@itsmeieijij</p>
                    </div>
                    <textarea onChange={handleChange} placeholder="Write a caption ...." className={`w-full h-56  outline-none rounded-lg p-2 border-b  border-gray-300 focus:outline-none  focus:border-gray-400 `} />
                    <Button onClick={creatPost} className=' bg-dodger-blue-500 text-white py-2 px-16 mt-4' >Post</Button>
                </div>
            </div>
        </>
    )
}