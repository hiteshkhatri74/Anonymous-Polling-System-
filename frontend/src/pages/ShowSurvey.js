import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ShowSurvey = () => {
  const {id} = useParams();
  const [survey, setSurvey] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted , setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const fetchSurvey = async () => {
    try{
       const surveyData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/${id}`);

       if(surveyData.data.data.status === 'active'){
          setSurvey(surveyData.data.data);
       }
       else{
         setError("Survey not Found");
       }
    }
    catch (err) {
      setError(err?.message || "Survey not found");
    }
  };

  useEffect(() => {
     fetchSurvey();
  },[id]);

  const handleSubmit = async () => {
    try{
      if(!selectedOption) return alert("Select an option first!");
      
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/submit/${id}`,{
        option : selectedOption,
      });
      
      if(response?.data?.success){
         setSubmitted(true);
      }
      else{
        setError(response?.data?.message);
      }
    }
    catch (err) {
      setError(err?.message || "Error Submitting response");
    }
  }

  if(error) {
    return (
        <div className='min-h-screen flex items-center justify-center bg-red-100 text-xl font-semibold'>
            ❌ {error}
        </div>
    );
  }

  if(!survey) {
    return (
        <div className='min-h-screen flex items-center justify-center text-xl'> 
            🔃  Loading Survey ...
        </div>
    );
  }

  if(submitted) {
     return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-green-100 text-green-700 text-xl font-semibolde'>
            ✔ Thank you! Your response has been recorded.
        </div>
     );
  }

  return (
    <div className='min-h-screen bg-slate-500 flex items-center justify-center'>
        <div className='max-w-xl w-full bg-white flex flex-col p-4 items-center justify-center rounded'>
           <h2 className='text-2xl font-bold mb-4'>{survey.question}</h2>

            {
              survey.options.map((opt, i) => (
                <label 
                   key={i}
                   className={`border w-full rounded p-3 mb-3 cursor-pointer hover:bg-blue-100 ${selectedOption === opt ? 'bg-blue-200' : ''}`}
                >

                    <input 
                        type='radio'
                        name='option'
                        value={opt}
                        className='mr-2'
                        onChange={() => setSelectedOption(opt)}
                    />
                    {opt}

                </label>
              ))
            }

           <button 
               onClick={handleSubmit}
               className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mt-4 font-semibold'
           >
                Submit Response
           </button>
        </div>
    </div>
  )
}

export default ShowSurvey