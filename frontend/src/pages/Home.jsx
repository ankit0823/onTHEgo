import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <div className='h-screen flex justify-between flex-col w-full'>
        <img className='h-screen w-full' src="go.webp" />
        <div className='bg-white pb-7 py-5 px-8'>
            <h2 className='text-2xl font-bold'>Get Started with onTHEgo!</h2>
            <Link to='/user-login'  className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
