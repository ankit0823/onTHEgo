import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {

    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const submitHandler = async (e) =>{
        e.preventDefault()

        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
              rideId: props.ride._id,
              otp: otp,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
    
          if (response.status === 200) {
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
            navigate('/driver-riding', {
              state: {
                ride: props.ride,
              },
            });
          }
        } catch (err) {
          // Handle errors and set the error message
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError('Please Enter OTP.');
          }
        }
      };

      
    

  return (
    <div className="">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm This Ride to start
      </h3>

      <div className="flex mt-4 p-3 text-white bg-[#6d9dd3] rounded-lg items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1669688174637-92ff26cc0a9b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
          />
          <h2 className="text-xl font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold"></h5>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.pickup}</h3>
              <p className="text-sm -mt-1 text-gray-600">
              Pickup At
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.destination}</h3>
              <p className="text-sm -mt-1 text-gray-600">
              Drop off
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

          <form onSubmit={ submitHandler }>
            <input
            value={otp}
            onChange={(e)=>{
                setOtp(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-3/4 mb-2 ml-3 p-2' type="text" placeholder='Enter OTP'/>
            {error && <p className="text-red-600 text-sm mt-2 px-4">{error}</p>}
            <div className="mt-3 px-3 flex justify-between gap-5 items-center">
            <button
              onClick={() => {}}
              className=" bg-[#3ea4d3] text-white font-semibold px-10 py-2 rounded-lg"
            >
              Confirm
            </button>

            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                  props.setRidePopupPanel(false);
              }}
              className=" bg-red-600 text-white font-semibold px-10 py-2 rounded-lg"
            >
              Cancle
            </button>
            </div>
            
          </form>
        
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
