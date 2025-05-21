import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
    const {AuthCheck} = useAuth();
    const [formData, setFormData] = useState({
         name : '',
         email : '',
         password : '',
         confirmPassword : ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            if(formData.password !== formData.confirmPassword){
                return toast.error('Please check password and confirm password');
            }

            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/signup`,{
                name : formData.name,
                email : formData.email,
                password : formData.password
            },{
                withCredentials : true
            });

            if(res.data.success) {
                toast.success(res.data.message || "Signed up successfully");
                await AuthCheck();
                navigate('/dashboard');
            }
            else{
                toast.error(res.data.message || "Something went wrong");
            }
        }
        catch(err) {
            toast.error("Server Error. Try again later");
        }
    }

  return (
    <div className='min-h-screen w-full h-full flex items-center justify-center bg-slate-500'>
        <form 
            onSubmit={handleSubmit}
            className='max-w-md w-full bg-white flex flex-col items-center justify-center p-4 rounded'
        >
            <h2 className='text-2xl font-bold mb-4 text-center text-blue-600'>Admin Sign Up</h2>

            <div className='w-full flex flex-col gap-1 pt-2 mb-3 border-t border-t-black'>
                <label>Enter Your Username :</label>
                <input 
                     type='text'
                     name='name'
                     placeholder='enter your name here'
                     value={formData.name}
                     onChange={handleChange}
                     className='w-full px-4 py-2 border rounded outline-none bg-slate-200'
                     required
                />
            </div>

            <div className='w-full flex flex-col gap-1 mb-3'>
                <label>Enter Your Email :</label>
                <input
                    type='email'
                    name='email'
                    placeholder='enter your email here'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded outline-none bg-slate-200'
                    required
                />
            </div>

            <div className='w-full flex flex-col mb-3 gap-1'>
                <label>Enter Your Password :</label>
                <div className='flex flex-row items-center justify-around bg-slate-200 border rounded px-2'>

                    <input 
                        type={showPassword ? "text" : "password"}
                        name='password'
                        placeholder='enter your password here'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full px-2 py-2 outline-none bg-slate-200'
                        required
                    />

                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className='bg-slate-200 cursor-pointer text-gray-500'
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} /> }
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col mb-1 gap-1'>
                <label>Enter Your Confirm Password :</label>
                <div className='flex flex-row items-center justify-around bg-slate-200 border rounded px-2 '>

                    <input 
                        type={showConfirmPassword ? "text" : "password"}
                        name='confirmPassword'
                        placeholder='enter your confirm password here'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className='w-full px-2 py-2 outline-none bg-slate-200'
                        required
                    />

                    <div
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='cursor-pointer text-gray-500 bg-slate-200' 
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} /> }
                    </div>
                </div>
            </div>

            <div className='w-full text-left text-sm px-2 mb-3'>
            <p> Already have an account ? {" "}
                    <a 
                        href='http://localhost:3000/signin'
                        className='text-red-400 hover:text-red-600'
                    >
                        Login
                    </a>
            </p>
            </div>

            <button
                 type='submit'
                 className='w-full bg-blue-500 text-white py-2 rounded  hover:bg-blue-600'
            >
                Sign Up
            </button>
        </form>

        <ToastContainer position='top-center' />
    </div>
  )
}

export default SignUp