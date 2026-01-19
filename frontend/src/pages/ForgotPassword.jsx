import {React, useState} from 'react'
import { IoMdArrowBack } from "react-icons/io";
import {useNavigate } from 'react-router';

// import {handleSignUp} from '../pages/SignUp.jsx';


function ForgotPassword() {
    const [step, setStep] = useState(3);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();
  return (

    <div className='min-h-screen flex items-center w-full justify-center p-4 mb-6' style={{ backgroundColor: '#fff9f6' }} >
       <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
        <div className='flex items-center gap-4 mb-4 cursor-pointer'>
            <IoMdArrowBack size={30} onClick={() => navigate('/signin')} className='text-[#ff4d2d]' />
            <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
        </div>
        {step === 1 && (
            <div>
            <div className='mb-4'>
          <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
          <input type="text" id="email" className='w-full px-4 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <button className={`w-full py-2 rounded-md text-white font-semibold mt-4 hover:bg-orange-600 transition-colors bg-[#ff4d2d] cursor-pointer`}  >Send OTP</button>
        </div>
        )}

        {step === 2 && (
            <div>
            <div className='mb-4'>
          <label htmlFor="otp" className='block text-gray-700 font-medium mb-1'>Otp</label>
          <input type="text" id="otp" className='w-full px-4 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500' placeholder='Enter your otp' onChange={(e) => setOtp(e.target.value)} value={otp} />
        </div>
        <button className={`w-full py-2 rounded-md text-white font-semibold mt-4 hover:bg-orange-600 transition-colors bg-[#ff4d2d] cursor-pointer`}  >VERIFY OTP</button>
        </div>
        )}

        {step === 3 && (
            <div>
            <div className='mb-4 gap-4'>
          <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
          <input type="text" id="newPassword" className='w-full px-4 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500' placeholder='Enter new password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />

          <input type="text" id="confirmNewPassword" className='w-full px-4 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500' placeholder='Enter Confirm password' onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} />
        </div>
        <button className={`w-full py-2 rounded-md text-white font-semibold mt-4 hover:bg-orange-600 transition-colors bg-[#ff4d2d] cursor-pointer`}  >Reset Password</button>
        </div>
        )}
        
       </div>
    </div>
  )
}

export default ForgotPassword;
