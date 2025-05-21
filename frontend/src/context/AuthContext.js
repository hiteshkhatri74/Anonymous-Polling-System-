import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);   // To prvent flashing

    const AuthCheck = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/surveys/verify`,{
                withCredentials : true
            });

            if(res.data.authorized){
                setIsAuthenticated(true);
            }
            else{
                setIsAuthenticated(false);
            }
        }
        catch(err){
            setIsAuthenticated(false);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        AuthCheck();     // check auth status on load
    },[]);

    return (
        <AuthContext.Provider value={{ isAuthenticated , loading, AuthCheck }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);