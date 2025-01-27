import React from 'react'

const RideOption = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{
          props.setRideOption(false)
      }}  ><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

        <h4 className='text-2xl font-semibold mb-5'>Ride Options</h4>
        
        <div onClick={()=>{
            props.setConfirmRide(true)
            props.setVehcleType('car')
        }} className='flex items-center w-full p-3 border-4 mb-2 rounded-xl active:border-black bg-[#C4C4C4] justify-between'>
          <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"  />
          <div className='w-1/2 ml-4'>
            <h4 className='font-medium text-base'>onTHEgoCar <span> <i className="ri-user-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 min away</h5>
            <p className='font-normal text-xs'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRide(true)
            props.setVehcleType('moto')
        }} className='flex items-center w-full p-3 border-4 mb-2 rounded-xl active:border-black bg-[#C4C4C4] justify-between'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"  />
          <div className='w-1/2'>
            <h4 className='font-medium text-base'>onTHEgoMoto<span> <i className="ri-user-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>3 min away</h5>
            <p className='font-normal text-xs'>Affordable, Moto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.moto}</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRide(true)
            props.setVehcleType('auto')
        }} className='flex items-center w-full p-3 border-4 mb-2 rounded-xl active:border-black bg-[#C4C4C4] justify-between'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"  />
          <div className='w-1/2'>
            <h4 className='font-medium text-base'>onTHEgoAuto <span> <i className="ri-user-fill"></i>3</span></h4>
            <h5 className='font-medium text-sm'>5 min away</h5>
            <p className='font-normal text-xs'>Affordable, Auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
        </div>
    </div>
  )
}

export default RideOption
