import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Home from './pages/Home';
import Loginpage from './components/Loginpage';

function App() {
  return (
    <div>
     <BrowserRouter>
     <Home/>
     <Routes>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/Login' element = {<Loginpage/>}/> 
     </Routes>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
