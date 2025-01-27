import React, {useContext} from 'react'
import { Route, Routes } from 'react-router-dom'
import DriverLogin from './pages/DriverLogin'
import DriverSignup from './pages/DriverSignup'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import Start from './pages/Start'
import UserLogout from './pages/UserLogout'
import DriverDashboard from './pages/DriverDashboard'
import DriverProtectWrapper from './pages/DriverProtectWrapper'
import DriverLogout from './logout/DriverLogout'
import Riding from './pages/Riding'
import DriverRiding from './pages/DriverRiding'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/driver-signup" element={<DriverSignup />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/start" element={
          <UserProtectWrapper>
            <Start />
          </UserProtectWrapper>
        } />
        <Route path="/user-logout" element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />

        <Route path="/driver-dashboard" element={
          <DriverProtectWrapper>
            <DriverDashboard/>
          </DriverProtectWrapper>
        } />

        <Route path='/driver-logout' element={
          <DriverProtectWrapper>
            <DriverLogout />
          </DriverProtectWrapper>
        } />

        <Route path='/driver-riding' element={
          <DriverProtectWrapper>
            <DriverRiding />
          </DriverProtectWrapper>
        } />

        

      </Routes>
    </div>
  )
}

export default App
