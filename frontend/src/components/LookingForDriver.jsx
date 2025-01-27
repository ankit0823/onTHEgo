import React, { useEffect, useRef } from "react";
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const LookingForDriver = (props) => {

  const imgRef = useRef(null);

  useEffect(() => {
    // Adding infinite rotation animation using GSAP
    gsap.to(imgRef.current, {
      rotation: 360, // Rotate 360 degrees
      duration: 5, // Duration for one full rotation
      repeat: -1, // Infinite repeat
      ease: "linear", // Smooth and continuous rotation
    });
  }, []);



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
          <div className="flex items-center gap-5 p-3 ">
            <i className="ri-bank-card-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Ride prize
              </p>
            </div>
          </div>
        </div>
        {/* <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Confirm
        </button> */}
      </div>
    </div>
  );
};

export default LookingForDriver;
