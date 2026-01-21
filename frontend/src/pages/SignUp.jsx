
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "/firebase"; 



export default function SignUp() {
  const primaryColor = '#ff4d2d';
  const hoverColor = '#e64323';
  const bgColor = '#fff9f6';
  const borderColor = '#ddd';
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSignUp = async () => {
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`, {
        fullName,
        email,
        mobileNumber,
        password,
        role
      }, {
        withCredentials: true
      })
      console.log(result);
      setErr('');
    } catch (error) {
      setErr(error?.response?.data?.message);
    }
  }

  const handleGoogleAuth = async () => {
    // Handle Google authentication logic here
    if(!mobileNumber){
      return setErr("mobile number is required!");
      return;
    }

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      try {
        const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
          email: result.user.email,
          fullName: result.user.displayName,
          mobileNumber,
          role
        }, {
          withCredentials: true
        });
        console.log(data);
        setErr('');
      } catch (error) {
        setErr(error?.response?.data?.message);
      }
  }

  return (
    <div className='min-h-screen flex items-center w-full justify-center p-4' style={{ backgroundColor: bgColor }}>
      <div className={`bg-white rounded-lg shadow-lg w-full max-w-md p-8 border-[1px]`} style={{ borderColor: borderColor }}>
        <h1 className='text-2xl font-bold mb-4 text-center' style={{ color: primaryColor }}>Vingo</h1>
        <p className='text-gray-600 mb-8'>Create your account to get started with delicious food delivery.</p>

        {/* fullname */}

        <div className='mb-4'>
          <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
          <input type="text" id="fullName" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' placeholder='Enter your full name' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setFullName(e.target.value)} value={fullName} required />
        </div>

        {/* email */}

        <div className='mb-4'>
          <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
          <input type="text" id="email" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' placeholder='Enter your email' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>


        {/* mobile number */}

        <div className='mb-4'>
          <label htmlFor="mobileNumber" className='block text-gray-700 font-medium mb-1'>Mobile Number</label>
          <input type="text" id="mobileNumber" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' placeholder='Enter your mobile number' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setMobileNumber(e.target.value)} value={mobileNumber} required />
        </div>

        {/* password */}

        <div className='mb-4'>
          <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
          <div className="relative">
            <input type={`${showPassword ? "text" : "password"}`} id="password" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' placeholder='Enter your password' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setPassword(e.target.value)} value={password} required />

            <button className="absolute right-3 top-[14px] cursor-pointer text-gray-500" onClick={() => setShowPassword(prev=>!prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
          </div>
        </div>


        {/* role selection */}
        <div className='mb-4'>
          <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
          <div className=" flex gap-2">
            {['user', 'owner', 'deliveryBoy'].map((r) => (
              <button className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer" 
              onClick = {() => setRole(r)} style={
                role == r ? {backgroundColor: primaryColor, color: "white"} 
              : {border:`1px solid  ${primaryColor}`, color: primaryColor}}>{r}</button>
            ))}
          </div>
        </div>

        {/* sign up */}
        <button className={`w-full py-2 rounded-md text-white font-semibold mt-4 hover:bg-orange-600 transition-colors  `} style={{ backgroundColor: primaryColor, hoverColor: hoverColor }} onClick={handleSignUp}>Sign Up</button>
        <p className="text-red-500 text-center">{err}</p>

          {/* sign up with google */}
        <div className="mt-4 text-center">
          <button className="mt-2 text-gray-600 flex items-center justify-center w-full py-2 rounded-md text-black font-semibold border border-gray-400  transition-colors hover:bg-gray-200" onClick={handleGoogleAuth}>
            <FcGoogle className="mr-2" /> Sign Up with Google
          </button>
          <p className={`mt-2 cursor-pointer text-gray-600`}>Already have an account? <a href="/signin" onClick={() => navigate("/signin")} className={`text-orange-500 hover:underline text`}>Login</a></p>
        </div>
      </div>

    </div>
  )
}
