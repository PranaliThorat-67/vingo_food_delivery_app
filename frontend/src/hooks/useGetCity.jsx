import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setCity, setUserData } from '../redux/userSlice.js'
import { useSelector } from 'react-redux'

function useGetCity() {
  const dispatch = useDispatch();
  const apikey = import.meta.env.VITE_GEOAPIKEY;
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`);
      dispatch(setCity(result?.data?.results[0].city));
    });
    }, [userData]);

}

export default useGetCity
