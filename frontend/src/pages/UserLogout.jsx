import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap'; // Import GSAP

const UserLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // Animate the logout message with GSAP
    gsap.to('.logout-container', {
      rotateY: 360,
       // Infinite repeat
      ease: "linear",
      opacity:0,
      duration: 1,
      onComplete: () => {
        // After animation completes, make the API call
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {   
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          if (response.status === 200) {
            localStorage.removeItem('token');
            setTimeout(() => {
              navigate('/user-login');
            }, 500); // Delay to ensure the animation finishes
          }
        });
      }
    });
  }, [token, navigate]);

  return (
    <div className="h-screen bg-[#C4C4C4] flex items-center justify-center">
      <img className='logout-container h-20 rounded-full' src="go.webp"/>
    </div>
  );
};

export default UserLogout;
