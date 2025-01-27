import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DriverLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/drivers/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/driver-login'); // Redirect to login page
        }
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        // Handle error, if necessary
        navigate('/driver-login'); // Redirect to login even if there's an error
      });
  }, [navigate]); // Dependency array ensures useEffect runs only once

  return null; // Do not render anything on this page
};

export default DriverLogout;
