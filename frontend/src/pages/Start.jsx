import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchBar from '../components/LocationSearchBar'
import RideOption from '../components/RideOption'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import DriverDetails from '../components/DriverDetails'
import axios from 'axios'
import  {SocketDataContext}  from '../context/SocketContext'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'
import Sidebar from '../components/Sidebar'


const Start = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [trip, setTrip] = useState(false);
  const [rideOption, setRideOption] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [driverDetails, setDriverDetails] = useState();
  // const [suggestion, setSuggestion] = useState();
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({});
  const [vehicleType, setVehcleType] = useState(null)
  const [ride, setRide] = useState(null)
  const [error, setError] = useState('');

  const navigate = useNavigate();


  const tripRef = useRef(null);
  const closeRef = useRef(null);
  const rideOptionRef = useRef(null);
  const confirmRideRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const driverDetailsRef = useRef(null);


  const { socket } = useContext(SocketDataContext);
  const { user } = useContext(UserDataContext)

  useEffect(()=>{
    socket.emit('join', { userType: "user" , userId: user._id })
  },[user])

  

  socket.on('ride-confirmed', ride => {
    setLookingForDriver(false)
    setDriverDetails(true)
    setRideOption(false)
    setRide(ride)
    console.log(setRide);
    
  })

  socket.on('ride-started',ride =>{
    navigate('/riding', { state: { ride } })
    console.log(ride);
    
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    setError('');
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setPickupSuggestions(response.data)
    } catch {
        // handle error
    }
  }
  
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    setError('');
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setDestinationSuggestions(response.data)
    } catch {
        // handle error
    }
}
  
  // }


  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function(){
    if (trip) {
      gsap.to(tripRef.current, {
        height: '420px',
        padding: '20px',
        
      })
      gsap.to(closeRef.current, {
        opacity: 1,
        rotate: 180,
        duration: 1.5
      })
    }
    else{
      gsap.to(tripRef.current, {
        height: '0px',
        padding: '0px',
       
      })
      gsap.to(closeRef.current, {
        opacity: 0,
        rotate: 0,
        duration: 1.5
      })
    }
   
  }, [trip])
  
  useGSAP(function(){
    if(rideOption){
      gsap.to(rideOptionRef.current, {
        transform: 'translateY(0%)',
      })
    }else{
      gsap.to(rideOptionRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [rideOption])

  useGSAP(function () {
    if(confirmRide){
      gsap.to(confirmRideRef.current,{
        transform: 'translate(0)'
      })
    }else{
      gsap.to(confirmRideRef.current,{
        transform: 'translate(100%)'
      })
    }
  },[confirmRide])

  useGSAP(function () {
    if(lookingForDriver){
      gsap.to(lookingForDriverRef.current,{
        transform: 'translate(0)'
      })
    }else{
      gsap.to(lookingForDriverRef.current,{
        transform: 'translate(100%)'
      })
    }
  },[lookingForDriver])

  useGSAP(function () {
    if(driverDetails){
      gsap.to(driverDetailsRef.current,{
        transform: 'translate(0)'
      })
    }else{
      gsap.to(driverDetailsRef.current,{
        transform: 'translate(100%)'
      })
    }
  },[driverDetails])



  async function findTrip(){

    if (!pickup || !destination) {
      setError('Both pickup and destination fields are required.');
      return;
    }

    setRideOption(true)
    setTrip(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        console.log(response.data);
        setFare(response.data);

  }
  
  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup, destination, vehicleType },
     { headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }}
  )

  console.log(response.data);
  // setFare(response.data);

  }

  return (
   <>
    <div className=' h-screen relative '>
      <div className='h-[65%]'>
        <div className="flex items-center justify-between w-screen p-2 bg-[#8298b7]">
              <span className='-mt-4'> <Sidebar /></span>
                <Link
                  to="/user-logout"
                  className="h-8 w-8 bg-white flex items-center justify-center rounded-full"
                >
                  <i className="text-lg font-medium ri-logout-box-line"></i>
                </Link>
              </div>
        <div className='h-[100%]'>
        <LiveTracking/>
        </div>
        {/* <div className='h-[40%]  bg-teal-300 '>
        <img className='w-16 absolute  left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
        <div className="h-[400px]">
        
      </div>
        </div> */}
      </div>
     {/* <div className='h-[60%]'>
     <img className='w-16 absolute  left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
      <div className='h-screen w-screen'>
      <LiveTracking />

      </div>
     </div> */}
      <div className='flex flex-col justify-end absolute bottom-0 w-full bg-[#C4C4C4]'>
       <div className='h-[30%] p-5 relative'>
        <h5
        ref={closeRef}
        onClick={() => {
          setTrip(false)
        }}
         className='absolute opacity-0 top-4 right-6 text-2xl font-semibold cursor-pointer'>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>

       <h4 className='text-2xl mb-3 text-center text-[#31473A] font-semibold'>Find a trip</h4>
        <form onSubmit={submitHandler}  >
          <span className='text-lg p-1 text-[#31473A] font-semibold'>Enter Locations</span>
          <span className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-600 rounded-full'>
          </span>
          <input
          onClick={() => {
            setTrip(true)
            setActiveField('pickup')
          }}
          value={pickup}
          onChange={ handlePickupChange }
          
          className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4' required type="text" placeholder='Enter your location'/>
          <input
          onClick={() => {
            setTrip(true)
            setActiveField('destination')
          }}
          value={destination}
          onChange= { handleDestinationChange }          
          className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4' type="text" required placeholder='Enter your destination'/>
          {/* Show error if fields are not filled */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
          <button
          
          onClick={findTrip}
          className='bg-[#405266] text-white px-4 py-2 w-full rounded-lg mt-3 text-xl'>
          Find Trip
          </button>
        </form>
        
       </div>
       <div ref={tripRef} className='bg-[#C4C4C4] h-0 mt-6'>
        <LocationSearchBar 
        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}

        setTrip={setTrip} 
        setRideOption={setRideOption}
        setPickup = {setPickup}
        setDestination ={ setDestination}
        activeField={activeField}
        
        />
        

       </div>
      </div>

      <div ref={rideOptionRef} className='fixed z-10 bottom-0 w-full translate-y-full bg-[#afc5de] px-3 py-10 pt-12'>
       
      <RideOption
      setVehcleType ={setVehcleType}
      fare ={fare} createRide={createRide} setConfirmRide={setConfirmRide} setRideOption={setRideOption} />
      </div>

      <div ref={confirmRideRef} className='fixed z-10 bottom-0 w-full translate-y-full bg-[#C4C4C4] px-3 py-6 pt-12'>
        <ConfirmRide
        pickup = {pickup}
        destination = {destination}
        fare ={fare}
        vehicleType ={vehicleType}
        createRide={createRide}
        setConfirmRide={setConfirmRide} setLookingForDriver ={setLookingForDriver} />
      </div>

      <div ref={lookingForDriverRef} className='fixed z-10 bottom-0 w-full translate-y-full bg-[#C4C4C4] px-3 py-6 pt-12'>
        <LookingForDriver
        ride ={ride}
        pickup = {pickup}
        destination = {destination}
        fare ={fare}
        vehicleType ={vehicleType}
        setLookingForDriver ={setLookingForDriver} />
      </div>

      <div ref={driverDetailsRef}  className='fixed z-10 bottom-0 w-full translate-y-full bg-white px-3 py-6 pt-12'>
        <DriverDetails
        ride ={ride}
        setLookingForDriver ={setLookingForDriver}
        setDriverDetails={setDriverDetails} />
      </div>

    </div>
   </>
  )
}

export default Start
