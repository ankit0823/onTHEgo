import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1658825831108-93088006330d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-16 ml-8' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdHz9g1DSnrFRaNEa4o3DSAjmYAhfjSaxeug&s" />
        <div className='bg-white pb-7 py-5 px-8'>
            <h2 className='text-2xl font-bold'>Get Strated with Uber</h2>
            <Link to='/user-login'  className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
