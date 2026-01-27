import React from 'react'
import UserDashboard from '../components/UserDashboard';

function Home() {
    const {userData} = useSelector((state) => state.user);
  return (
    <div className=''>
      {userData && userData.role == 'user' && <UserDashboard />}
      {userData && userData.role == 'owner' && <OwnerDashboard />}
      {userData && userData.role == 'deliveryBoy' && <DeliveryBoy />}
    </div>
  )
}

export default Home
