import React, { useContext } from "react";

import {DriverDataContext} from '../context/DriverContext'



const DriverData = () => {

  const { driver } = useContext(DriverDataContext)
  

  return (
    <div>
      <div className="flex items-center mt-1 justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-14 w-14 rounded-full object-cover"
            src="https://global.discourse-cdn.com/spiceworks/optimized/4X/6/c/9/6c901d49be739d433c67e0d45b54bacd62a8faed_2_666x500.jpeg"
          />
          <h4 className="text-lg font-medium capitalize">{driver.fullname.firstname + " " + driver.fullname.lastname} </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹295.60</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex justify-center mt-8 p-3 bg-gray-100 rounded-xl gap-5 items-start">
        <div className="text-center">
          <i className="text-2xl font-extralight ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-extralight ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-extralight ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default DriverData;
