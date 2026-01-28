import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx';
import useGetCurrentUser from './hooks/useGetCurrentUser.jsx';
import { useSelector } from 'react-redux';
export const serverUrl = 'http://localhost:8000'   //backend server url
import Nav from './components/Nav.jsx';

function App() {
  useGetCurrentUser()
  const {userData} = useSelector((state) => state.user);
  return (
    <>
      <Nav/>
    <Routes>
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
    </Routes>
    </>
  )
}

export default App
