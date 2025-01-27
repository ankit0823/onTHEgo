import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'


const UserSignup = () => {

     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [firstname, setFirstname] = useState('');
     const [lastname, setLastname] = useState('');
     const [userData, setUserData] = useState({});

     const navigate = useNavigate();
     const { user , setUser } = useContext(UserDataContext);


     const handleSubmit = async (e) => {
            e.preventDefault();
            const newUser ={
                fullname: {
                        firstname: firstname,
                        lastname: lastname,
                    },               
                email: email,
                password: password 
                
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

            if(response.status === 201){
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token);
                navigate('/start');
            }

            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
        }
    


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-16 mb-10' src="logo.png" />
    <form onSubmit={(e) => {
        handleSubmit(e)
    }} >

        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
        <div className='flex gap-3 mb-5'>
        <input 
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' 
        type="text" 
        placeholder="firstname" 
        value={firstname}
        onChange={(e) => {setFirstname(e.target.value)}}
        />
        
        <input 
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' 
        type="text" 
        placeholder="lastname"
        value={lastname}
        onChange={ (e) => {
            setLastname(e.target.value)
        }}
        />
        </div>


        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        required
        value={email}
        onChange={(e) => {
            setEmail(e.target.value)
        }}
        className='bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base' 
        type="text" 
        placeholder="example@gmail.com" />

        <h3 className='text-lg font-medium mb-2 mt-4'>Enter Password</h3>
        <input 
        required
        value={password}
        onChange={(e) => {
            setPassword(e.target.value)
        }}
        className='bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'  
        type="password" placeholder="Password" />

        <button 
        className='w-full px-4 py-2 rounded bg-[#c44e1d] font-semibold text-xl mb-3 text-white'>Sign up</button>

    </form>

    <p className='text-center mt-2'>
            Already have a account? <Link to='/user-login' className='text-blue-600'>Login as User</Link>
        </p>

    </div>

    <div>
        <p className='text-[10px] leading-tight'>  By proceeding, you consent to get calls, WhatsApp or SMS
            messages, including by automated means, from Uber and its affiliates to the number you provide.</p>

    </div>
    </div>
  )
}

export default UserSignup
