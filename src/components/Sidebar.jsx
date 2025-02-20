import { Heart, Home } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


const SideBar = () => {

    return (
        <>
            <DesktopSideBar />
            <MobileSideBar />


        </>
    )
}

export default SideBar

const DesktopSideBar = () => {
    return (
        <div className='min-h-screen p-10 md:p-3 w-24 md:w-64 border-r hidden sm:block border-gray-500 '>
            <div className='flex flex-col gap-20 sticky top-10 left-0'>
                
                <div className='w-full '>
                    <img src="/logo2.png" alt="logo" className=' md:block hidden' />
                    <img src="/mobile-logo.svg" alt="logo" className=' md:hidden block' />
                </div>
                <div className='flex gap-6 flex-col items-center md:items-start'>
                    <Link to={'/'}>
                        <div className='flex gap-4 '>
                            <Home />
                            <p className='font-bold tracking-wide cursor-pointer md:block hidden'>Home</p>
                        </div>
                    </Link>
                    <Link to={'/favorite'}>
                        <div className='flex gap-4 '>
                            <Heart />
                            <p className='font-bold tracking-wide cursor-pointer md:block hidden'>Favourites</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const MobileSideBar = () => {
    return (
        <div className='sm:hidden flex justify-center gap-10 border-t p-4 border-gray-300 fixed z-10  w-full bottom-0 left-0 bg-black '>
           
                <Link to={'/'}>
                    <Home size={"24"} className='cursor-pointer' / >
                </Link>
                <Link to={'/favorite'}>
                    <Heart size={"24"} className='cursor-pointer' / >
                </Link>
            
        </div>
    )
}

