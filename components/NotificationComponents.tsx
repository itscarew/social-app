import Image from "next/image";

export default function NotificationCard() {
    return (
        <div className="bg-white px-5 py-3.5 mb-4 rounded-lg shadow hover:shadow-xl max-w-3xl  transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
            <div className="flex items-center justify-between mt-2 rounded-lg px-1 py-1 cursor-pointer">
                <div className='flex items-center' >
                    <div className="relative flex flex-shrink-0 items-end">
                        <Image alt='#' className="h-16 w-16 rounded-full" src="/pic1.jpeg" height={40} width={40} style={{ objectFit: "cover" }} />
                        <span className="absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-white"></span>
                    </div>
                    <div className="ml-3">
                        <span className="font-semibold tracking-tight text-xs">John Doe </span>
                        <span className="text-xs leading-none opacity-50">reacted to your comment:</span>
                        <p className="text-xs leading-4 pt-2 italic opacity-70">This is the comment you wrote, This is the comment you wrote</p>
                        <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">a few seconds ago</span>
                    </div>
                </div>
                <div className="relative flex flex-shrink-0 items-end">
                    <Image alt='#' className="h-16 w-16 rounded-md" src="/pic1.jpeg" height={40} width={40} style={{ objectFit: "cover" }} />
                </div>
            </div>
        </div>


    )
}