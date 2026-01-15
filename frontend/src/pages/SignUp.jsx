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
              <input type="text" id="fullName" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your full name' />

            </div>
        </div>

    </div>
  )
}
