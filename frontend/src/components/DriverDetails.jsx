import React from 'react'

const DriverDetails = (props) => {
  // Add null check for ride and driver data
 

  return (
    <div>
    <h5
      className="p-1 text-center w-[93%] absolute top-0"
      onClick={() => {
        props.setDriverDetails(false);
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
    </h5>

    <div className='flex items-center justify-between'>
    <img
        className="h-16"
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
      />
      <div className='text-right' >
        <h2 className='text-lg font-medium capitalize'>{props.ride?.driver.fullname.firstname + " " + props.ride?.driver.fullname.lastname} </h2>
        <h4 className='text-xl font-semibold -mt-2 -mb-1'>
        {props.ride?.driver.vehicle.plate}
        </h4>
        <p className='text-sm text-gray-600'>OTP - {props.ride?.otp}</p>
      </div>
    </div>

    <div className="flex flex-col gap-5 justify-between items-center">
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className="text-lg font-medium">pickup</h3>
            <p className="text-sm -mt-1 text-gray-600">
            {props.ride?.pickup}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill"></i>
          <div>
            <h3 className="text-lg font-medium">drop of</h3>
            <p className="text-sm -mt-1 text-gray-600">
            {props.ride?.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 ">
          <i className="ri-bank-card-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
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
  )
}

export default DriverDetails
