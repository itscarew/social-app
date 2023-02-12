import AppHead from '../components/Head'
import NavBar from './Navbar'
import HeaderNavBar from './HeaderNavBar';
import React from "react";

export default function Layout({ children }: any) {
    return (
        <>
            <AppHead />
            <div className={`relative text-gray-900 `}>
                <div className='fixed top-0 w-full z-10' >
                    <HeaderNavBar />
                </div>

                <div className={`md:flex py-12 md:py-0 min-h-screen font-body mx-auto font-medium text-base`} >
                    <NavBar />
                    <div className='md:flex-1 w-full  py-10 bg-gray-50  leading-none'>
                        {children}
                    </div>
                    <div className=' py-10 border-l-2 border-gray-200 px-6 md:block' style={{ width: "33rem" }}  >
                        Mini Profile
                    </div>
                </div>
            </div>
        </>
    )
}