import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DriverDataContext } from '../context/DriverContext';
import axios from 'axios';

const DriverLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', server: '' }); // Error state

    const navigate = useNavigate();
    const { setDriver } = React.useContext(DriverDataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({ email: '', password: '', server: '' });

        // Basic client-side validation
        if (!email.includes('@')) {
            setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
            return;
        }
        if (password.length < 6) {
            setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters long' }));
            return;
        }

        try {
            const driverData = {
                email: email,
                password: password,
            };

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/drivers/login`, driverData);

            if (response.status === 200) {
                const data = response.data;
                setDriver(data.driver);
                localStorage.setItem('token', data.token);
                navigate('/driver-dashboard');
            }
        } catch (error) {
            // Handle server errors
            if (error.response && error.response.data.message) {
                setErrors((prev) => ({ ...prev, server: error.response.data.message }));
            } else {
                setErrors((prev) => ({ ...prev, server: 'Something went wrong. Please try again later.' }));
            }
        }

        // Reset fields
        setEmail('');
        setPassword('');
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between bg-[#dddcc7]">
            <div>
                <img className="w-16 mb-6" src="logo.png" alt="Logo" />
                <form onSubmit={handleSubmit}>
                    <h3 className="text-lg font-medium mb-2">What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base ${
                            errors.email ? 'border border-red-500' : ''
                        }`}
                        type="text"
                        placeholder="email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                    <h3 className="text-lg font-medium mb-2 mt-4">Enter Password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base ${
                            errors.password ? 'border border-red-500' : ''
                        }`}
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                    <button className="w-full px-4 py-2 rounded bg-[#3b768c] font-semibold text-xl mt-5 text-white">
                        Login
                    </button>
                </form>

                {errors.server && <p className="text-red-500 text-center mt-4">{errors.server}</p>}

                <p className="text-center mt-2">
                    New here? <Link to="/driver-signup" className="text-blue-600">Register as Driver</Link>
                </p>
            </div>

            <div>
                <Link
                    to="/user-login"
                    className="flex items-center justify-center w-full px-4 py-2 rounded bg-[#c44e1d] font-semibold text-xl mt-5 text-white"
                >
                    Sign in as User
                </Link>
            </div>
        </div>
    );
};

export default DriverLogin;
