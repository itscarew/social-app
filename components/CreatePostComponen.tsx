import Image from "next/image";
import { FcStackOfPhotos } from "react-icons/fc"
import Button from "./Button";

export default function CreatePostComponent({ height }: Partial<any>) {
    return (
        <>
            <div className="flex h-[30rem]" >
                <div className="relative w-7/12 flex flex-col items-center justify-center" >
                    <FcStackOfPhotos size={120} />
                    <p className="text-xl" >Bring your photos here</p>
                    <label className=' bg-dodger-blue-500 text-white py-2 px-8 mt-4 rounded-lg cursor-pointer'>
                        <span className="mt-2 text-base leading-normal">Lets see your computer</span>
                        <input type='file' className="hidden" />
                    </label>
                </div>
                {/* <div className="relative w-7/12" >
                    <Image src={"/pic1.jpeg"} alt="#" fill style={{ objectFit: "cover" }} />
                </div> */}
                <div className="flex-1 p-4 " >
                    <div className="flex items-center text-base py-6 " >
                        <div className="relative  rounded-full overflow-hidden w-12 h-12 mr-2" >
                            <Image src={"/pic1.jpeg"} alt="#" fill style={{ objectFit: "cover" }} />
                        </div>
                        <p className="font-normal">@itsmeieijij</p>
                    </div>
                    <textarea placeholder="Write a caption ...." className={`w-full h-56  outline-none rounded-lg p-2 border-b  border-gray-300 focus:outline-none  focus:border-gray-400 `} />
                    <Button className=' bg-dodger-blue-500 text-white py-2 px-16 mt-4' >Post</Button>
                </div>
            </div>
        </>
    )
}