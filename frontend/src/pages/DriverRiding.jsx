import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";

const DriverRiding = () => {
  const [finishRide, setFinishRiding] = useState(false);
  const finishRideRef = useRef(null);
  const location = useLocation();
  const ride = location.state?.ride;

  useGSAP(
    function () {
      if (finishRide) {
        gsap.to(finishRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRide]
  );

  return (
    <div className="h-screen">
      <div className="fixed flex items-center justify-between w-screen p-3">
        <img
          className="w-16 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <Link
          to="/driver-dashboard"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-home-4-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <LiveTracking/>
      </div>

      <div
        onClick={() => {
          setFinishRiding(true);
        }}
        className="h-1/5 p-6 flex items-center justify-between bg-[#5481b3] relative"
      >
        <h5 className="p-1 text-center w-[90%] absolute top-0">
          <i className="text-3xl  text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <div>
          <h4 className="text-xl text-white font-semibold">4KM</h4>
          {/* <p className="text-lg">{ride?.user.fullname.firstname} {ride?.user.fullname.lastname}</p>
          <p className="text-sm">To: {ride?.destination}</p> */}
        </div>
        <button className=" bg-orange-400 text-white font-semibold px-8 py-2 rounded-lg">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRideRef}
        className="fixed z-10 bottom-0 w-full h-4/5 translate-y-full  bg-white px-3 py-6 pt-12"
      >
        <FinishRide
        ride={ride}
        setFinishRiding = {setFinishRiding} />
      </div>
    </div>
  );
};

export default DriverRiding;
