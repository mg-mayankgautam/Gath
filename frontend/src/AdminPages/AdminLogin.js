import React, { useState } from 'react'
import img from '../assets/login/login1.png'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import useAuth from '../hooks/useAuth'; 

const AdminLogin = () => {
    //use auth
    const { auth } = useAuth();
    const { setAuth } = useAuth();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
    };

    const handleLogin = async () => {
        let newErrors = {};

        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length === 0) {

            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
                    id: formData.email,
                    password: formData.password,
                });
                console.log(response.data);
                const { accessToken } = response.data; // Assume backend returns accessToken
                const decodedToken = jwtDecode(accessToken); // Decode the JWT

                console.log(decodedToken);
                setAuth(decodedToken)
                navigate('/dashboard')

            } catch (error) {
                console.error("Wrong Credentials", error);
            }

        }

        setErrors(newErrors);
    };


    return (

        <div className='bigscreen max-h-[100vh] h-[100vh] p-10'>

            <div className='max-w-[1024px] mx-auto max-h-full p-8 bg-white shadow grid grid-cols-2 
            !gap-8'>

                <div className='h-full max-h-full w-full rounded-2xl'>
                    <img src={img} className='object-cover max-h-full h-[calc(100vh-156px)] w-full rounded-2xl opacity-90' />
                </div>


                <div className='flex flex-col gap-8 py-12'>
                    <Link to='/' className='h-8'>
                        <img src={logo} className='object-contain h-full' />
                    </Link>

                    <div className='mt-8 text-2xl font-semibold'>Admin Login</div>


                    <div className='relative'>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className='input w-full'
                        />

                        {errors.email && (
                            <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className='relative'>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className='input w-full'
                        />

                        {errors.password && (
                            <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>


                    <button className='greenButton mt-2 mx-auto'
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>

            </div>

        </div>

    )
}

export default AdminLogin