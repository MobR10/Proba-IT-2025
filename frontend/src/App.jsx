import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {useParams} from "react-router-dom";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Grills from "./components/grills.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import ForgotPassword from './components/forgot-password.component';
import ResetPassword from './components/reset-password.component';

import Profile from "./components/profile.component";
import Footer from './components/footer.component';

function ResetPasswordWrapper(){
  const {token} = useParams();
  return <ResetPassword token={token} />;
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate token and restore user session on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // Verify token with backend
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setLoggedInUser(res.data.user.Prenume);
      })
      .catch(() => {
        // Token is invalid/expired
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('userRole');
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('userRole');
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    window.location = "/";
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center min-vh-100"><p>Loading...</p></div>;

  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
      <Navbar loggedInUser={loggedInUser} handleLogout={handleLogout}/>

        <main className='flex-grow-1'>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/grills" element={<Grills/>}/>
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route path="/resetPassword/:token" element={<ResetPasswordWrapper/>}/>
        </Routes>
        </main> 
        <Footer/>
      </div>
    </Router>
  )
}

export default App;
