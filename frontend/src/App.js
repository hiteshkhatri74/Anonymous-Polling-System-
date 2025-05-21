import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ShowSurvey from './pages/ShowSurvey';
import ViewResults from './pages/ViewResults';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import CreateSurvey from './pages/CreateSurvey';

function App() {
  return (
    <BrowserRouter>
        <Routes>
             <Route path='/' element={<Navigate to={"/signin"} />} />
             <Route path='/signup' element={<SignUp />} />
             <Route path='/signin' element={<SignIn />} />
             <Route path='/survey/:id' element={<ShowSurvey />} />

             {/* Protected Routes */}
             <Route path='/dashboard' element={
              <PrivateRoute> <AdminDashboard /> </PrivateRoute>
              } />

             <Route path='/create' element={
              <PrivateRoute><CreateSurvey /> </PrivateRoute>
              } />

             <Route path='/results/:id' element={
              <PrivateRoute><ViewResults /> </PrivateRoute>
              } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
