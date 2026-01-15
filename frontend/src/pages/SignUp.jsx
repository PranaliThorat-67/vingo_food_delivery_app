import React from 'react'

export default function SignUp() {
    const primaryColor = '#ff4d2d';
    const hoverColor = '#e64323';
    const bgColor = '#fff9f6';
    const borderColor = '#ddd';

  return (
    <div className='min-h-screen flex items-center w-full justify-center p-4' style={{ backgroundColor: bgColor }}>
        <div className={`bg-white rounded-lg shadow-lg p-8 w-full max-w-md p-8 border-[1px]`} style={{ borderColor: borderColor }}>
            <h1 className='text-2xl font-bold mb-4 text-center' style={{ color: primaryColor }}>Vingo</h1>
            <p className='text-gray-600 mb-8'>Create your account to get started with delicious food delivery.</p>

            {/* fullname */}

            <div className='mb-4'>
              <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
              <input type="text" id="fullName" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' placeholder='Enter your full name' style={{border: `1px solid ${borderColor}`}} />
            </div>

            {/* email */}

            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
              <input type="text" id="email" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' placeholder='Enter your email' style={{border: `1px solid ${borderColor}`}} />
            </div>


            {/* mobile number */}

            <div className='mb-4'>
              <label htmlFor="mobileNumber" className='block text-gray-700 font-medium mb-1'>Mobile Number</label>
              <input type="text" id="mobileNumber" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' placeholder='Enter your mobile number' style={{border: `1px solid ${borderColor}`}} />
            </div>

            {/* password */}

            <div className='mb-4'>
              <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
              <input type="password" id="password" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' placeholder='Enter your password' style={{border: `1px solid ${borderColor}`}} />
            </div>

        </div>

    </div>
  )
}
