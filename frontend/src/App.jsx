import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx';
import useGetCurrentUser from './hooks/useGetCurrentUser.jsx';
import { useSelector } from 'react-redux';
export const serverUrl = 'http://localhost:8000'   //backend server url
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import useGetCity from './hooks/useGetCity.jsx';
import useGetMyShop from './hooks/useGetMyShop.jsx';

function App() {
  useGetCurrentUser()
  useGetCity(); 
  useGetMyShop();
  const {userData} = useSelector((state) => state.user);
  return (
    <>
      <Nav/>
    <Routes>
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path="/" element={!userData ? <Navigate to={"/signin"} /> : <Home />} />
    </Routes>
    </>
  )
}

export default App
