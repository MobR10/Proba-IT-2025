import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Grills from "./components/grills.component";
import Login from "./components/login.component";
import Register from "./components/register.component";

import Profile from "./components/profile.component";
import CreateGrill from './components/create-grill.component';
import Footer from './components/footer.component';

function App() {

  return (
    <Router>
      <div>
      <Navbar/>
        <br/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/grills" element={<Grills/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/createGrill" element={<CreateGrill/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;
