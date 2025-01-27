import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DriverData from "../components/DriverData";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import ConfirmRidePopUp from "../components/ConfirmRidePopUp ";
import { useContext } from "react";
import { DriverDataContext } from "../context/DriverContext";
import { SocketDataContext } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const DriverDashboard = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)

  const [confirmridePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const confirmridePopupPanelRef = useRef(null)

const [ride, setRide] = useState(null)

  const { driver } = useContext(DriverDataContext)
  const { socket } = useContext(SocketDataContext)

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.emit('join',{
      userId: driver._id,
      userType: 'driver'
    })

    const intervalId = () => {
      if (navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition(position => {

          // console.log({userId: driver._id,
          //   location: {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude
          //   }});
          
          socket.emit('update-location-driver', {
            userId: driver._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    }
    const locationInterval = setInterval(intervalId, 10000)
    intervalId()
    // return () => clearInterval(intervalId);
  },[])
 
  socket.on('new-ride', (data) => {
    // console.log(data);
    setRide(data)
    setRidePopupPanel(true)
  })

  async function confirmRide(){
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        driverId: driver._id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data) {
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
      }
    } catch (err) {
      console.error('Error confirming ride:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to confirm ride');
    } finally {
      setIsLoading(false);
    }
  }


  useGSAP(function () {
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current,{
        transform: 'translate(0)'
      })
    }else{
      gsap.to(ridePopupPanelRef.current,{
        transform: 'translate(100%)'
      })
    }
  },[ridePopupPanel])

  useGSAP(function () {
    if(confirmridePopupPanel){
      gsap.to(confirmridePopupPanelRef.current,{
        transform: 'translate(0)'
      })
    }else{
      gsap.to(confirmridePopupPanelRef.current,{
        transform: 'translate(100%)'
      })
    }
  },[confirmridePopupPanel])

  return (
    <div className="h-screen">
      <div className="flex items-center bg-[#8298b7] justify-between w-screen p-2">
        <img
          className="w-8 rounded-full "
          src="onthego.jpg"
          />
        <Link
          to="/driver-logout"
          className="h-8 w-8 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-line"></i>
        </Link>
      </div>
      <div className="h-[93%]">
      <div className="h-[63%]">
        <LiveTracking/>
      </div>
      <div className=" p-6 bg-[#C4C4C4] ">
        <DriverData />
      </div>
      </div>
      <div ref={ridePopupPanelRef}  className='fixed z-10 bottom-0 w-full -translate-x-full  bg-white px-3 py-6 pt-12'>
        <RidePopUp
        ride={ride}
        confirmRide={confirmRide}
        isLoading={isLoading}
        error={error}
        setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={confirmridePopupPanelRef}  className='fixed z-10 bottom-0 w-full h-screen translate-y-full  bg-[#C4C4C4] px-3 py-6 pt-12'>
        <ConfirmRidePopUp
        ride = {ride}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  );
};

export default DriverDashboard;
