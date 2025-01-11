import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const DriverLogin = () => {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
    
        const [driver, setDriverData] = useState({
        });
    
        const handleSubmit = (e) => {
            e.preventDefault();
            // console.log(email, password);
            setDriverData({
                email: email, 
                password: password
            });
            console.log(driver);
            
            setEmail('');
            setPassword('');
        }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-20 mb-6' src="https://www.svgrepo.com/show/505031/uber-driver.svg" />
    <form onSubmit={(e) => {
        handleSubmit(e)
    }} >
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        required
        value={email}

        onChange={(e) => setEmail(e.target.value)}


        className='bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base' 
        type="text" 
        placeholder="email@example.com" />

        <h3 className='text-lg font-medium mb-2 mt-4'>Enter Password</h3>

        <input 
        required
        value={password}
        
        onChange={(e) => setPassword(e.target.value)}

        className='bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base'  
        type="password" placeholder="Password" />

        <button 
        className='w-full px-4 py-2 rounded bg-[#111] font-semibold text-xl mt-5 text-white'>Login</button>

    </form>

    <p className='text-center mt-2'>
            New here? <Link to='/driver-signup' className='text-blue-600'>Register as Driver</Link>
        </p>

    </div>

    <div>
        <Link to='/user-login' className='flex items-center justify-center w-full px-4 py-2 rounded bg-[#d5622d] font-semibold text-xl mt-5 text-white'>Sign in as User</Link>

    </div>
    </div>
  )
}

export default DriverLogin
