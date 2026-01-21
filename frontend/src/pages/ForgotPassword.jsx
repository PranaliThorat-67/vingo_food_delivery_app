import {React, useState} from 'react'
import { IoMdArrowBack } from "react-icons/io";
import {useNavigate } from 'react-router';
import { serverUrl } from "../App";
import axios from 'axios';


function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();


    const handleSendOtp = async () => {
      try {
        const response = await axios.post(`${serverUrl}/api/auth/send-otp`, { email },
          { withCredentials: true }
        );
        console.log(response);
        setErr('');
        setStep(2);

      } catch (error) {
        setErr(error?.response?.data?.message);
      }
    };

    const handleVerifyOtp = async () => {
      try {
        const response = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp },
          { withCredentials: true }
        );
        console.log(response);
        setErr('');
        setStep(3);

      } catch (error) {
        setErr(error?.response?.data?.message);
      }
    };

    const handleResetPassword = async () => {
      if(newPassword !== confirmNewPassword){
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword },
          { withCredentials: true }
        );
        console.log(response);
        setErr('');
          navigate('/signin');
        
      } catch (error) {
        setErr(error?.response?.data?.message);
      }
    };

  return (

    <div className='min-h-screen flex items-center w-full justify-center p-4 mb-6' style={{ backgroundColor: '#fff9f6' }} >
       <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
        <div className='flex items-center gap-4 mb-4 cursor-pointer'>
            <IoMdArrowBack size={30} onClick={() => navigate('/signin')} className='text-[#ff4d2d]' />
            <h1 className='text-2xl cursor-pointer font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
        </div>
        {step === 1 && (
            <div>
            <div className='mb-4'>
          <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
          <input type="text" id="email" className='w-full px-4 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <button className={`w-full py-2 rounded-md text-white font-semibold mt-4 hover:bg-orange-600 transition-colors bg-[#ff4d2d] cursor-pointer`} onClick={handleSendOtp} >Send OTP</button>
        <p className="text-red-500 text-center">{err}</p>
        </div>
        )}

        {step === 2 && (
            <div>
            <div className='mb-4'>
          <label htmlFor="otp" className='block text-gray-700 font-medium mb-1'>Otp</label>
          <input type="text" id="otp" className='w-full px-4 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500' placeholder='Enter your otp' onChange={(e) => setOtp(e.target.value)} value={otp} required />
        </div>
        <button className={`w-full py-2 rounded-md text-white font-semibold mt-4 hover:bg-orange-600 transition-colors bg-[#ff4d2d] cursor-pointer`} onClick={handleVerifyOtp} >VERIFY OTP</button>
        <p className="text-red-500 text-center">{err}</p>
        </div>
        )}

        {step === 3 && (
            <div>
            <div className='mb-4 gap-4'>
              <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-1 ' >New Password</label>
              <input type="text" id="newPassword" className='w-full px-4 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500' placeholder='Enter new password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} required />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
              <input type="text" id="confirmNewPassword" className='w-full px-4 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500' placeholder='Enter Confirm password' onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} required />
            </div>
        <button className={`w-full py-2 rounded-md text-white font-semibold mt-4 hover:bg-orange-600 transition-colors bg-[#ff4d2d] cursor-pointer`} onClick={handleResetPassword}  >Reset Password</button>
        <p className="text-red-500 text-center">{err}</p>
        </div>
        )}
        
       </div>
    </div>
  )
}

export default ForgotPassword;
