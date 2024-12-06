import './App.css';
import React,{ useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route , Navigate} from 'react-router-dom'; 
import Home from './pages/Home';
import Loginpage from './components/Loginpage';
import Profile from './pages/Profile';
import AddQuestion from './pages/Addquestion';
import Courses from './pages/Courses';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  useEffect(() => {
    // Check for a token in local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  
  return (
    <div>
     <BrowserRouter>
        <Routes>
            <Route path ='/' element ={isLoggedIn ? <Home /> : <Navigate to="/login" />} />            
            <Route path='/login' element = {<Loginpage/>}/> 
            <Route path='/profile' element= {<Profile />} />
            <Route path='/AddQuestion' element = {<AddQuestion/>}/>
            <Route path='/courses' element= {<Courses/>} />
        </Routes>
      
    </BrowserRouter>
    </div>
  );
}

export default App;
