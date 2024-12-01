import React ,{ useState } from 'react'
import './CSS/Loginpage.css'
import { Link } from 'react-router-dom';
import user_icon from "../assests/profile.png"
import email_icon from "../assests/gmail.png"
import password_icon from "../assests/locked-computer.png"
import phone_icon from "../assests/phone.png"


const Loginpage = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className='loginpage'>
        <h3> Welcome !!! </h3>
        <div className="header">
                <div className="toggle-button">
                    <button className={action === "Login" ? "toggle-button-login active" : "toggle-button-login"} onClick={() => setAction("Login")}>Login</button>
                    <button className={action === "Sign Up" ? "toggle-button-signup active" : "toggle-button-signup"} onClick={() => setAction("Sign Up")}>Sign Up</button>
                </div>
            </div>
            <div className="inputs">
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt='' />
                        <input type="text" placeholder='First Name' />
                    </div>
                )}
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt='' />
                        <input type="text" placeholder='Last Name' />
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt='' />
                    <input type="email" placeholder='Email' />
                </div>
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={phone_icon} alt='' />
                        <input type="tel" placeholder='Phone Number' />
                    </div>
                )}
                <div className="input">
                    <img src={password_icon} alt='' />
                    <input type="password" placeholder='Password' />
                </div>
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={password_icon} alt='' />
                        <input type="password" placeholder='Confirm Password' />
                    </div>
                )}
                {action === "Login" && (
                    <div className="forget-password">Lost password? <span>Click Here!</span></div>
                )}
            </div>
            <div className="submit-container">
           <Link to = "/"><button className="submit">Submit</button></Link>
            </div>
                  
    </div>
  );
}


export default Loginpage