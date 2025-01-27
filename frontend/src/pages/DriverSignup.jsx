import React, { useState , useContext} from 'react'
import { Link } from 'react-router-dom';
import { DriverDataContext } from '../context/DriverContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DriverSignup = () => {

    const navigate = useNavigate();

        const [email, setEmail] = useState('')
         const [password, setPassword] = useState('')
         const [firstname, setFirstname] = useState('');
         const [lastname, setLastname] = useState('');
         
        const [vehiclePlate, setVehiclePlate] = useState('');
        const [vehicleCapacity, setVehicleCapacity] = useState('');
        const [vehicleColor, setVehicleColor] = useState('');
        const [vehicleType, setVehicleType] = useState('');

         const { driver, setDriver } = React.useContext(DriverDataContext);
    
         const handleSubmit = async (e) => {
                e.preventDefault();
                const driverData = {
                    fullname: {
                        firstname: firstname,
                        lastname: lastname,
                    },               
                    email: email,
                    password: password,
                    vehicle: {
                        plate: vehiclePlate,
                        capacity: vehicleCapacity,
                        color: vehicleColor,
                        vehicleType: vehicleType
                    } 
                }

                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/drivers/register`, driverData);
                
                if(response.status === 201){
                    const data = response.data;
                    setDriver(data.driver);
                    localStorage.setItem('token', data.token);
                    navigate('/driver-dashboard');
                }

                setFirstname('');
                setLastname('');
                setEmail('');
                setPassword('');
                setVehiclePlate('');
                setVehicleCapacity('');
                setVehicleColor('');
                setVehicleType('');
            }

        return (
    <div className='p-7 h-screen flex flex-col justify-between bg-[#dddcc7] '>
    <div>
    <img className='w-16 mb-2' src="logo.png" />
    <form onSubmit={(e) => {
        handleSubmit(e)
    }} >

        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
        <div className='flex gap-3 mb-2'>
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

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
        required
        value={password}
        onChange={(e) => {
            setPassword(e.target.value)
        }}
        className='bg-[#eeeeee] mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'  
        type="password" placeholder="Password" />

        
        <h3 className='text-lg font-medium mb-2 mt-2'>Vehicle Information</h3>
        <div className='flex gap-3 mb-3'>
            <input 
                required
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' 
                type="text" 
                placeholder="Vehicle Plate Number"
            />
            <input 
                required
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' 
                type="number" 
                placeholder="Vehicle Capacity"
            />
        </div>

        <div className='flex gap-3 mb-5'>
            <input 
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base' 
                type="text" 
                placeholder="Vehicle Color"
            />
            <select 
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg'
            >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="moto">Moto</option>
                <option value="auto">Auto</option>
            </select>
        </div>
        <button 
        className='w-full px-4 py-2 rounded-lg bg-[#1b2e3d] font-semibold text-xl mb-2 text-white'>Create New Account</button>

    </form>

    <p className='text-center'>
            Already have a account? <Link to='/driver-login' className='text-blue-600'>Login as Driver</Link>
        </p>

    </div>

    <div>
        <p className='text-[6px] leading-tight'>  By proceeding, you consent to get calls, WhatsApp or SMS
            messages, including by automated means, from Uber and its affiliates to the number you provide.</p>

    </div>
    </div>
  )
}

export default DriverSignup
