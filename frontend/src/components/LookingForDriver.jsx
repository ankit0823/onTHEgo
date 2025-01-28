import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const LookingForDriver = (props) => {
  const imgRef = useRef(null);
  const [rides, setRides] = useState([]); // State to track all rides

  useEffect(() => {
    // Adding infinite rotation animation using GSAP
    gsap.to(imgRef.current, {
      rotation: 360,
      duration: 5,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  const handleCancelRide = () => {
    // Find the ride to cancel based on its unique identifier
    const rideToCancel = rides.find(ride => ride.id === props.ride?.id);
    if (rideToCancel) {
      setRides(rides.filter(ride => ride.id !== rideToCancel.id));
    }
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setLookingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for Driver</h3>

      <div className="flex flex-col gap-5 justify-between items-center">
        <img ref={imgRef}
          className="h-20 rounded-full"
          src="onthego.jpg"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">pickUp</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">DropOff</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-bank-card-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Ride prize
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          props.setLookingForDriver(false)
        }}
        className="mt-8 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Cancel This Ride
      </button>
    </div>
  );
}

export default LookingForDriver;
