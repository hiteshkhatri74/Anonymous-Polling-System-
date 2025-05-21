import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [surveys, setSurveys] = useState([]);

    const fetchSurveys = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/allsurveys`,{
                withCredentials: true
            });
            setSurveys(res.data.data);
        }
        catch(err){
            toast.error( err.message || "Failed to fetch surveys");
        }
    }

    useEffect(() => {
        fetchSurveys();
    },[]);

    const handleDelete = async (id) => {
        try{
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/delete/${id}`,{
                withCredentials : true
            });

            fetchSurveys();
            toast.success("Survey deleted successfully");
        }
        catch(err){
            toast.error("Error deleting survey");
        }
    }

    const handleLogout = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/logout`,{},{
            withCredentials : true
        });
        toast.success("Logged out successfully");
        navigate("/");
    }

    const handleStop = async (id) => {
        try {
          const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/stop/${id}`,{},{
            withCredentials : true
          });
          fetchSurveys();
          toast(res.data.message);
        }
        catch (err) {
          toast( err.message || err || 'Failed to stop survey');
        }
      };

  return (
    <div className='min-h-screen w-full bg-slate-400'>
        {/* Navbar  */}
        <nav className='bg-blue-400 text-white flex justify-between items-center p-4 rounded'>
            <h1 className='text-2xl font-bold'>Admin Dashboard</h1>

            <div className='flex gap-4'>
                <Link to='/create' className='bg-white text-slate-500 px-4 py-2 rounded hover:bg-green-300 hover:text-white'>
                     Create Survey
                </Link>

                <button
                     onClick={handleLogout}
                     className='bg-red-400 hover:bg-red-500 px-4 py-2 rounded font-medium text-white'
                >
                    Logout
                </button>
            </div>
        </nav>

        {/* Survey List  */}
        <div className='max-w-4xl mx-auto mt-5 p-4 bg-white rounded'>
            <h2 className='text-xl font-semibold mb-4'>All Surveys</h2>

            {
               Array.isArray(surveys) && surveys.length > 0 ? (
                    <div className='space-y-3'>
                        {
                            surveys.map((survey) => (
                                <div 
                                    key={survey._id}
                                    className='border-2 px-4 py-2 rounded flex flex-col'
                                >
                                    <div className='flex items-center justify-between gap-4 mb-4'>
                                        <h3><span className='font-bold'>Question</span> : {survey.question}</h3>
                                        <div className='flex items-center gap-2'>
                                            <p>Status: {""}
                                               <span className={survey.status === 'active' ? "text-green-600" : "text-red-600"}>
                                                {survey.status === 'active' ? "Active" : "Stopped"}
                                               </span>
                                            </p>

                                             {
                                                survey.status === 'active' ? (
                                                    <button 
                                                       type='button'
                                                       className='border rounded bg-red-500 text-white px-4 py-2  hover:bg-red-600'
                                                       onClick={() => handleStop(survey._id)}
                                                    >
                                                        Stop Survey
                                                    </button>
                                                ) : ('')
                                             }
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center gap-4 '>
                                        <Link
                                            to={`/results/${survey._id}`}
                                            className='border rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700'
                                        >
                                            View Results
                                        </Link>
                                        <button
                                           onClick={() => handleDelete(survey._id)}
                                           className='bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                ) : (
                    <p>No surveys found</p>
                ) 
            }
        </div>

        <ToastContainer position='top-center' />
    </div>
  );
}

export default AdminDashboard