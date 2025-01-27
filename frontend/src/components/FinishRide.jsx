import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FinishRide = (props) => {

  const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: props.ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/driver-dashboard')
        }

    }
  
  
  return (
    <div className="">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setFinishRiding(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Finish This Ride
      </h3>

      <div className="flex mt-4 p-3 border-2 border-blue-400 rounded-lg items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1669688174637-92ff26cc0a9b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
          />
          <h2 className="text-xl font-medium">{props.ride?.user.fullname.firstname +" " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold"></h5>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">pickUp</h3>
              <p className="text-sm -mt-1 text-gray-600">
              {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">DropOff</h3>
              <p className="text-sm -mt-1 text-gray-600">
              {props.ride?.destination}
              </p>
            </div>
          </div>
        </div>
            
            <div className="mt-6 w-full ">
            <button
            onClick={endRide}

              to="/driver-dashboard"
              className="w-full mt-5 flex text-xl justify-center bg-blue-600 text-white font-semibold p-3 rounded-lg"
            >
              Finish Ride
            </button>

            {/* <p className='mt-10 text-xs'>click on finish ride button if you have completed the ride </p> */}

            </div>
            
          
        
      </div>
    </div>
  ) 
}

export default FinishRide
