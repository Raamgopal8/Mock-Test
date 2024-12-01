import React, {useState} from 'react'
import './CSS/Homepage.css'

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const performSearch = () => {
      alert('You searched for: ' + searchTerm);
    };
  
      
  return (
    <div className="navbar">
    <div className="navbar-title">
        <h2>KSR INSTITUTE FOR ENGINEERING AND TECHNOLOGY</h2>
        <h2>MOCK TEST</h2>
              
    </div>
             
    <div className="search-bar">
          <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
                <button onClick={performSearch}>Search</button>
            </div>
     </div>
  )
}

export default Homepage