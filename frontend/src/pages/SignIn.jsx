
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

export default function SignUp() {
  const primaryColor = '#ff4d2d';
  const hoverColor = '#e64323';
  const bgColor = '#fff9f6';
  const borderColor = '#ddd';
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email,
        password,
      }, {
        withCredentials: true
      })
      console.log(result);
    } catch (error) {

    }
  }

  return (
    <div className='min-h-screen flex items-center w-full justify-center p-4' style={{ backgroundColor: bgColor }}>
      <div className={`bg-white rounded-lg shadow-lg w-full max-w-md p-8 border-[1px]`} style={{ borderColor: borderColor }}>
        <h1 className='text-2xl font-bold mb-4 text-center' style={{ color: primaryColor }}>Vingo</h1>
        <p className='text-gray-600 mb-8'>Sign in with your account to get started with delicious food delivery.</p>


        {/* email */}

        <div className='mb-4'>
          <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
          <input type="text" id="email" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' placeholder='Enter your email' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>



        {/* password */}

        <div className='mb-4'>
          <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
          <div className="relative">
            <input type={`${showPassword ? "text" : "password"}`} id="password" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' placeholder='Enter your password' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setPassword(e.target.value)} value={password} />

            <button className="absolute right-3 top-[14px] cursor-pointer text-gray-500" onClick={() => setShowPassword(prev=>!prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
          </div>
        </div>

        <div className="text-left mb-2 cursor-pointer" style={{color: primaryColor}} onClick={()=>navigate("/forgot-password")}>forgot password</div>


        {/* sign in */}
        <button className={`w-full py-2 rounded-md text-white font-semibold mt-4 hover:bg-orange-600 transition-colors  `} style={{ backgroundColor: primaryColor, hoverColor: hoverColor }} onClick={handleSignIn}>Sign In</button>

          {/* sign in with google */}
        <div className="mt-4 text-center">
          <button className="mt-2 text-gray-600 flex items-center justify-center w-full py-2 rounded-md text-black font-semibold border border-gray-400  transition-colors hover:bg-gray-200" >
            <FcGoogle className="mr-2" /> Sign Up with Google
          </button>
          <p className={`mt-2 cursor-pointer text-gray-600`}>Want to create a new account? <a href="/signup" onClick={() => navigate("/signUp")} className={`text-orange-500 hover:underline text`}>SignUp</a></p>
        </div>
      </div>

    </div>
  )
}
