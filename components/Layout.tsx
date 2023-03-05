import AppHead from '../components/Head'
import NavBar from './Navbar'
import HeaderNavBar from './HeaderNavBar';
import React from "react";
import { useRouter } from "next/router"
import Suggestions from './Suggestions';
import AuthComponent from './AuthComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Layout({ children }: any) {
    const router = useRouter()
    const authUser = useSelector((state: RootState) => state.user.authUser)
    return (
        <>
            <AppHead />
            <div className={`relative text-gray-900 `}>
                <div className='fixed top-0 w-full z-10' >
                    <HeaderNavBar />
                </div>

                <div className={`md:flex py-12 md:py-0 min-h-screen font-body mx-auto font-medium text-base`} >
                    {authUser?.uid && <NavBar />}
                    <div className='md:flex-1 w-full  py-10 bg-gray-50  leading-none'>
                        {children}
                    </div>
                    {router.pathname === "/" &&
                        <div className=' py-10 border-l-2 border-gray-200 px-16 md:block ' style={{ width: "33rem" }}  >
                            <Suggestions />
                            <div className='font-thin text-center my-6'> &copy; {new Date().getFullYear()} Olaonipekun Carew </div>
                        </div>}

                </div>
                <AuthComponent />
            </div>
        </>
    )
}