import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['','']);
    const [link, setLink] = useState('');
    const navigate = useNavigate();

    const addOption = () => {
        if(options.length < 4) {
            setOptions([...options, '']);
        }
    };

    const handleChange = (e,index) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const survey = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/create`,{ question, options }, {
            withCredentials : true
        });
        setLink(`${process.env.REACT_APP_FRONTEND_URL}/survey/${survey.data.data._id}`);
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-slate-500 p-4'>
            <div className="absolute top-4 left-4">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center"
                >
                <span className=' text-white text-xl'>⬅</span> Go To Dashboard
                </button>
            </div>

            <h1 className='text-3xl font-bold mb-6 text-white'>Create a New Survey</h1>

            <form onSubmit={handleSubmit} className='w-full max-w-lg bg-white p-6 rounded flex flex-col items-center justify-center'>
                    <label className='mb-3 font-semibold'>Enter question : </label>
                    <input
                         type='text'
                         value={question}
                         onChange={(e)=>setQuestion(e.target.value)}
                         className='w-full p-2 rounded outline-none border mb-2 border-gray-400'
                         required 
                    />

                    <label className='mb-3 font-semibold'>Enter options : </label>
                    <div className='grid grid-cols-2 gap-2 w-full mb-4'>
                    {
                        options.map((opt,index) => {
                            return (
                                <input 
                                     key={index}
                                     type='text'
                                     value={opt}
                                     onChange={(e) => handleChange(e,index)}
                                     className='p-2 rounded outline-none border border-gray-400'
                                     required
                                />
                            );
                        })
                    }
                    </div>

                    <button 
                         type='button'
                         onClick={addOption}
                         className='w-full p-2 text-white mb-4 rounded outline-none bg-green-500 hover:bg-green-600'
                    >Add Option +</button>

                    <button
                         type='submit'
                         className='w-full p-2 text-white mb-2 rounded outline-none bg-red-500 hover:bg-red-600'
                    >
                        Create Survey
                    </button>
            </form>

            {
                link && (
                    <div className='mt-6 p-4 bg-white rounded text-center flex'>
                        <p className='semibold'>Share this link : </p>
                        <a 
                           href={link} 
                           target='_blank'
                           rel='noopener noreferrer'
                           className='text-blue-600 underline'
                        >
                            {link}
                        </a>
                    </div>
                )
            }
        </div>
    );
}

export default CreateSurvey;