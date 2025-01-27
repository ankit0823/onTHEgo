import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from 'react'
import { SocketDataContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation()
  const {ride} = location.state || {}
  const { socket } = useContext(SocketDataContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        navigate('/start')
    })
  // console.log(ride);
  
  return (
    <div className="h-screen">
        <Link to='/start' className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-home-4-line"></i>
        </Link>
      <div className="h-[53%]">
        <LiveTracking/>
      </div>
      <div className="h-[40%] bottom-0 p-4">
      <div className='flex items-center justify-between'>
    <img
        className="h-16"
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
      />
      <div className='text-right' >
        <h2 className='text-lg font-medium capitalize'>{ride?.driver.fullname.firstname + " " + ride?.driver.fullname.lastname} </h2>
        <h4 className='text-xl font-semibold -mt-2 -mb-1'>{ride?.driver.vehicle.plate}</h4>
        <p className='text-sm text-gray-600'>XUV 700</p>
      </div>
    </div>

    <div className="flex flex-col gap-5 justify-between items-center">
      <div className="w-full mt-5">
        
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill"></i>
          <div>
            <h3 className="text-lg font-medium">{ride?.destination}</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Drop off
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-5 p-3 ">
          <i className="ri-bank-card-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">
            Ride Prize
            </p>
          </div>
        </div>
      </div>
      <button className="w-full mt-2 bg-green-600 text-white font-semibold p-2 rounded-lg">
        Make Payment
      </button>
    </div>
      </div>
    </div>
  );
};

export default Riding;
