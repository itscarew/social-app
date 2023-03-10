import Image from "next/image";
import { FcStackOfPhotos } from "react-icons/fc"
import Button from "./Button";
import { useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { TfiClose } from "react-icons/tfi"
import { app, dataBase, storage } from "@/utils/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { closeModal } from "@/store/slice/modalSlice";

export default function CreatePostComponent() {
    const dispatch = useDispatch()
    const auth = getAuth(app);
    const [post, setPost] = useState({ text: "", picture: "", pictureUrl: null })

    const handleChange = (e) => {
        setPost({ ...post, text: e.target.value })
    }

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile.size <= 1048576) {
            const selectedFileUrl = URL.createObjectURL(selectedFile);
            setPost({ ...post, picture: selectedFile, pictureUrl: selectedFileUrl });
        } else {
            alert("File to big, not more than 1mb")
        }
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
            userId: auth.currentUser.uid,
            createdAt: Date.now()
        };
        const postCollection = collection(dataBase, 'posts');
        const docRef = await addDoc(postCollection, newPost);
        // Return the ID of the new post in the Firestore collection
        return docRef.id;
    };


    const creatPost = async (e) => {
        e.preventDefault()
        await submitPost(post.text, post.picture);
        dispatch(closeModal())
    };


    return (
        <>
            <form className="flex md:flex-row flex-col md:h-[30rem] h-auto " onSubmit={creatPost} >
                {!post.pictureUrl &&
                    <div className="relative md:w-7/12 w-full md:h-auto h-[25rem]  flex flex-col items-center justify-center" >
                        <FcStackOfPhotos size={120} />
                        <p className="text-xl" >Bring your photos here</p>
                        <label className=' bg-dodger-blue-500 text-white py-2 px-8 mt-4 rounded-lg cursor-pointer'>
                            <span className="mt-2 text-base leading-normal">Lets see your computer</span>
                            <input type='file' name="file" value={post.pictureUrl} onChange={handleFileUpload} className="hidden" />
                        </label>
                    </div>
                }
                {post.pictureUrl &&
                    <div className="relative md:w-7/12 w-full md:h-auto h-[25rem] " >
                        <div onClick={refreshPicture} className="z-30 absolute top-5 right-5 bg-slate-400 rounded-full p-2 cursor-pointer" > <TfiClose size={15} color="#fff" /> </div>
                        <div className="w-full" >
                            <Image src={post.pictureUrl} alt="#" fill style={{ objectFit: "cover" }} />
                        </div>
                    </div>
                }
                <div className="flex-1 p-4 w-full h-auto " >
                    <textarea onChange={handleChange} placeholder="Write a caption ...." className={`w-full h-[19rem]  outline-none rounded-lg p-2 border-b  border-gray-300 focus:outline-none  focus:border-gray-400 `} />
                    <Button className={` bg-dodger-blue-500 text-white py-2 px-16 mt-4 ${!post.picture ? "opacity-60" : ""} `} disabled={!post.picture} >Post</Button>
                </div>
            </form>
        </>
    )
}