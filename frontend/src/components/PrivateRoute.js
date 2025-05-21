import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if(loading){
        return <p className="flex items-center justify-center bg-slate-500 text-white">Loading ... </p>;
    }

    return isAuthenticated ? children : <Navigate to="/signin" />;
}

export default PrivateRoute;