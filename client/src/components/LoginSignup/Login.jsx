import React , { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { MdClose , MdLockOutline , MdRemoveRedEye } from "react-icons/md";
import { SlEnvolope } from "react-icons/sl";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './LoginSignup.css';


function Login({ onRemove, onRegister }) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            const { token, user } = response.data; 
            if (response) {
                toast.success("Login successful");
                setTimeout(() => {
                    localStorage.setItem('token', token);
                    setEmail('');
                    setPassword('');
                    // Redirect based on role
                    if (user.role === "admin") {
                        navigate('/admin');
                    } else if (user.role === "user") {
                        navigate('/user');
                    }
                }, 2000);
            }
        } catch (error) {
            toast.success("Invalid Email or Password");
            console.error('Login Error', error);
        }
        };

    const handlePwToggle = (e) => {
        let parentElement = e.target.parentElement;
        while (parentElement) {
          const input = parentElement.querySelector("input");
          if (input) {
            input.type = input.type === "password" ? "text" : "password";
            break;
          }
          parentElement = parentElement.parentElement;
        }
    };

    return (
            <div className="form_container">
                <i className="form_close" onClick={onRemove}><MdClose /></i>
                <div className="form login_form">
                    <form method='POST' onSubmit={handleLogin}>
                        <h2>Login</h2>

                        <div className="input_box">
                            <input type="email" placeholder="Enter your Email" name='email' autoComplete="new-password" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <i className="email"><SlEnvolope /></i>
                        </div>
                        <div className="input_box">
                            <input type="password" placeholder="Enter your password" name='password' autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <i className="password"><MdLockOutline/></i>
                            <i className="pw_hide" onClick={handlePwToggle}><MdRemoveRedEye /></i>
                        </div>

                        <div className="option_field">
                            <span className="checkbox">
                                <input type="checkbox" id="check" />
                                <label htmlFor="check">Remember me</label>
                            </span>
                        <a href="#gfc" className="forgot_pw">Forgot password?</a>
                        </div>

                        <button className="btn-button">Login Now</button>
                    </form>
                </div>
                <div className="login_signup">
                Don't have an account? {''} <Link to="" onClick={onRegister}>Signup</Link>
                </div>
            </div>
    )
}

export default Login
