import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useState } from 'react'; 
import { IoMdClose } from "react-icons/io";
// import {userData} from '../redux/slices/userSlice.jsx';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
import { setMyShopData } from '../redux/ownerSlice.js';
import axios from 'axios';
import { serverUrl } from '../App';
import { FaPlus } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";


function Nav() {
  const {userData, city} = useSelector((state) => state.user);
  const {myShopData} = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Make an API call to log out the user
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {withCredentials: true});
      dispatch(setUserData(null)); // Clear user data from Redux store
      
    }
      catch (error) { 
        console.error("Logout failed:", error);
    }
  }


  return (
    <div className='w-full h-[80px] bg-white shadow-md flex items-center px-4 justify-center bg-white md:w-[60%] lg:w-[40%] mx-auto h-[80px]'>

      {showSearch && userData?.user?.role === "user"  && <div className='w-8 h-8 h-[70px] rounded-full bg-white rounded-lg shadow-md flex items-center px-4 fixed top-[80px] left-[18px] md:left-[10%] lg:left-[25%] z-50'>
        <div className='text-[#ff4d2d]' size={20}><FaLocationDot /></div>
        <div className='w-[80%] truncate text-gray-800'> kalyan </div>
        <div className='w-[80%] truncate text-gray-800' size={20}> <FaSearch /> <input type="text" placeholder="Search for restaurants or dishes" className="w-full outline-none" /> </div>
      </div>}


      <h1 className='text-2xl font-bold text-gray-800'>Vingo</h1>
      {userData?.user?.role === "user" && <div className='w-8 h-8 md:w-[60%] lg:w-[40%] h-[70px] rounded-full bg-white rounded-lg shadow-md flex items-center px-4 hidden md:flex ml-4'>
        <div className='text-[#ff4d2d]' size={20}><FaLocationDot /></div>
        <div className='w-[80%] truncate text-gray-800'> {city} </div>
        <div className='w-[80%] truncate text-gray-800'  size={20}> <FaSearch /> <input type="text" placeholder="Search for restaurants or dishes" className="w-full outline-none" /> </div>
      </div>}
      

    <div className='flex items-center gap-4'>
      {userData?.user?.role === "user" && (showSearch ? <IoMdClose size={25} className='text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(false)} /> : <FaSearch size={25} className='text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(true)}/>)}

      {userData?.user?.role === "owner" ? <>
      {myShopData && <> 
      <button className='px-3 py-1 hidden md:flex rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] ml-4 text-sm font-medium'>
      <FaPlus size={20}/>
       <span>Add Item</span> 
      </button>

      <button className='px-3 py-1 md:hidden flex rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] ml-4 text-sm font-medium'>
      <FaPlus size={20}/>
      </button></> }

      <div className='flex hidden md:flex relative items-center gap-2 px-3 py-1 cursor-pointer bg-[#ff4d2d]/10 text-[#ff4d2d] rounded-lg '>
          <IoReceiptSharp />
          <span>My Orders</span>
          <span className='absolute -top-2 -right-2 bg-[#ff4d2d] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>0</span>
      </div>
      <div className='flex  md:hidden relative items-center gap-2 px-3 py-1 cursor-pointer bg-[#ff4d2d]/10 text-[#ff4d2d] rounded-lg '>
          <IoReceiptSharp />
          <span className='absolute -top-2 -right-2 bg-[#ff4d2d] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>0</span>
      </div>
      </>
      :

      <>
      {userData?.user?.role === "user" && <div className='relative cursor-pointer'>
        <FaShoppingCart size={25} className='text-[#ff4d2d]' />
        <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d]'>0</span>
      </div>}

      <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] ml-4 text-sm font-medium'>
        My Orders
      </button>
      </>
      }

      
      <div className='w-[40px] h-[40px] rounded-full flex items-center font-semibold text-white justify-center bg-[#ff4d2d] cursor-pointer ' onClick={() => setShowInfo(prev=>!prev)}>
        {userData?.user?.fullName?.charAt(0).toUpperCase()}
      </div>

      {showInfo && <div className='fixed top-[80px] right-[18px] md:right-[10%] lg:right-[25%] w-[   200px] h-[200px] bg-white shadow-lg rounded-lg p-4'>
        <p className='text-gray-800'>Hello, {userData?.user?.fullName}</p>
        <p className='md:hidden text-gray-800 font-semibold cursor-pointer'>My Orders</p>
        <button className='mt-2 px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium' onClick={handleLogout}>
          Sign Out
        </button>
      </div>
}
      </div>
    </div>
    
  )
}

export default Nav
