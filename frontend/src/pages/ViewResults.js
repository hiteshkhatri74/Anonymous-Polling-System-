import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import  io  from 'socket.io-client';
import axios from 'axios';

const socket = io(`${process.env.REACT_APP_BACKEND_URL}` , {
  transports: ['websocket'],  // force WebSocket connection (avoids polling issues)
});

const ViewResults = () => {
  const { id } = useParams();
  const [survey, setSurvey ] = useState(null);
  const [responses, setResponses] = useState({});
  const [error, setError ] = useState('');
  const navigate = useNavigate();

  const fetchResults = async () => {
    try {
       const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/${id}`);
       setSurvey(res.data.data);

       const resultRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/responses/${id}`,{
        withCredentials : true
       });
       setResponses(resultRes.data.data);
    }
    catch(err) {
      setError(err || "Error loading survey results");
    }
  }

  useEffect(() => {
     fetchResults();
     socket.emit("join_survey_room", id);  // join Survey room

     const handleNewResponse = (data) => {
      if(data.surveyId === id) {
        // console.log("Received new response via socket", data);
        fetchResults();
      }
     }

     socket.on("new_response",handleNewResponse);

     return () => {
      socket.off("new_response",handleNewResponse);
     }
  },[id]);

  if(error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-red-100 text-red-700 text-xl font-semibold'>
         ❌ {error}
      </div> 
    );
  }

  if(!survey) {
    return (
       <div className='min-h-screen flex items-center justify-center text-white bg-slate-200 text-xl'>
         🔃  Loading Survey Results...
       </div>
    );
  }

  const total = responses && typeof responses === 'object' ? Object.values(responses).reduce((sum, count) => sum + count, 0) : 0 ;

  return (
    <div className='min-h-screen bg-slate-500 p-6 flex flex-col items-center justify-center'>
      <div className="absolute top-4 left-4">
         <button
           onClick={() => navigate('/dashboard')}
           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center"
         >
             <span className=' text-white text-xl'>⬅</span> Go To Dashboard
         </button>
      </div>

       <div className='max-w-xl w-full bg-white p-4 rounded flex flex-col mb-8'>
           <h2 className='text-2xl font-bold mb-4'>Survey Results</h2>
           <p className='text-lg font-semibold mb-6'>{survey.question}</p>
           
           {
             survey.options.map((opt,i) => {
                console.log(responses?.[opt.trim()] || 0);
                const count = responses?.[opt.trim()] || 0;
                const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;

                return (
                  <div key={i} className='mb-4'>
                        <div className="flex justify-between items-center mb-1">
                             <p className="font-medium text-gray-700">{opt}</p>
                             <p className="text-sm text-gray-500">{count} votes ({percent}%)</p>
                        </div>

                        <div className="w-full bg-gray-300 h-4 rounded overflow-hidden">
                            <div
                                className="bg-indigo-500 h-4"
                                style={{ width: `${percent}%` }}
                        ></div>
                        </div>
                  </div>
                );
             })
           }
       </div>
    </div>
  )
}

export default ViewResults;