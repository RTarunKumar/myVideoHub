import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import type { AppDispatch } from '../reducers/auth/store'
import { FaBars, FaCog, FaHome, FaTimes, FaUpload, FaUser, FaVideo } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { fetchUserDetails, logOutUser } from '../reducers/auth/authReducer'

const Sidebar: React.FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const toggleSideBar = () =>{
        setIsOpen((prev)=>{
            !isOpen
        })
    }

    useEffect(()=>{
        dispatch(fetchUserDetails())
    },[])

  return (
    <>
        <div className={`fixed top-0 left-0 z-40 w-64 h-screen
        bg-black text-white lg:bg-bgOne lg:text-textOne 
        shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}lg:translate-x-0`}
        >
            <div className='p-4 text-2xl font-semibold border-b border-gray-100 hidden md:block'>
                My Video Hub
            </div>
            <nav className='mt-10 md:mt-7 '>
                <ul className='space-y-2'>
                    <li>
                        <NavLink to={'/'} onClick={toggleSideBar}>
                        <FaHome size={20} className='mr-3'/>
                        <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/user/dashboard'} onClick={toggleSideBar}>
                        <FaUser size={20} className='mr-3'/>
                        <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/user/upload-video'} onClick={toggleSideBar}>
                        <FaUpload size={20} className='mr-3'/>
                        <span>Upload Video</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/user/edit/my-videos'} onClick={toggleSideBar}>
                        <FaVideo size={20} className='mr-3'/>
                        <span>My Videos</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/user/profile'} onClick={toggleSideBar}>
                        <FaCog size={20} className='mr-3'/>
                        <span>User Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <div className='flex items-center p-3 hover:bg-bgTwo hover:text-gray-900 rounded-md cursor-pointer
                        ' onClick={()=>dispatch(logOutUser(navigate))}>
                            <IoIosLogOut size={20} className='mr-3'/>
                            <span>Log Out</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <div>
            <button onClick={toggleSideBar}>
                {isOpen? <FaTimes/> : <FaBars/>}
            </button>
        </div>
    </>
  )
}

export default Sidebar