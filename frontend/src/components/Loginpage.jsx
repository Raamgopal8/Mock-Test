import React ,{ useState } from 'react'
import './CSS/Loginpage.css'
import { Link } from 'react-router-dom';
import user_icon from "../assests/profile.png"
import email_icon from "../assests/gmail.png"
import password_icon from "../assests/locked-computer.png"
import phone_icon from "../assests/phone.png"
import { registerUser , loginUser  } from '../api/auth';

function Loginpage ({ onLogin }) {
  const [action, setAction] = useState("Sign Up");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (action === "Sign Up") {
          const { confirmPassword, ...userData } = formData;
          if (userData.password !== confirmPassword) {
            alert("Passwords do not match");
            return;
          }
          await registerUser (userData);
          alert("User  registered successfully");
        } else {
          await loginUser ({ email: formData.email, password: formData.password });
          alert("Logged in successfully");
        }
      } catch (error) {
        alert("An error occurred during submission. Please try again.");
        console.error(error);
      }
    };
  
 
 return (
    <div className='loginpage'>
        <h3> Welcome !!! </h3>
        <div className="header">
                <div className="toggle-button">
                    <button className={action === "Login" ? "toggle-button-login active" : "toggle-button-login"} onClick={() => setAction("Login")}>Login</button>
                    <button className={action === "Sign Up" ? "toggle-button-signup active" : "toggle-button-signup"} onClick={() => setAction("Sign Up")}>Sign Up</button>
                </div>
            </div>
     <form onSubmit={handleSubmit}> 
            <div className="inputs">
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt='' />
                        <input type="text" placeholder='First Name' required onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    </div>
                )}
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt='' />
                        <input type="text" placeholder='Last Name' required onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt='' />
                    <input type="email" value={formData.email} name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder='Email' required />
                </div>

                {action === "Sign Up" && (
                    <div className="input">
                        <img src={phone_icon} alt='' />
                        <input type="tel" placeholder='Phone Number' required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                )}
                <div className="input">
                    <img src={password_icon} alt='' />
                    <input type="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder='Password' required />
                </div>
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={password_icon} alt='' />
                        <input type="password" placeholder='Confirm Password' required onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                    </div>
                )}
                {action === "Login" && (
                    <div className="forget-password">Lost password? <span>Click Here!</span></div>
                )}
            </div>
            <div className="submit-container">
            <Link to = "/"><button className="submit">Submit</button></Link>
            </div>
            </form>
           </div>
  );
}

export default Loginpage