import React ,{ useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdClose , MdLockOutline , MdRemoveRedEye } from "react-icons/md";
import { SlEnvolope,SlUserFollowing } from "react-icons/sl";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './LoginSignup.css';

function Signup({ onRemove, onLogin, role }) {
    const [username, setUsername] = useState("")
    const [department, setDepartment] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        fetchUsers();
    }, [])
    
    const fetchUsers = () => {
        axios
        .get('http://localhost:3001/register')
        .then((res) => {
            console.log(res.data)
        })
    }

    const handleSignup = (e) => {
            e.preventDefault();
            axios.post('http://localhost:3001/register', { username, department, email, password, role })
            .then(() => {
                toast.success("Registration successful");
                // alert('Registration Successful')
                setEmail('')
                setUsername('')
                setDepartment('')
                setPassword('')
                fetchUsers();
                setTimeout(() => { 
                    onLogin()
                }, 2000);
                
            })
            .catch((error) => {
                toast.error("Unable to register user");
                console.log('Unable to register user',error)
            })
        } 

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
                    <form method='POST' onSubmit={handleSignup}>
                        <h2>Signup</h2>
                        <div className="input_box">
                            <input type="text" placeholder="Enter your Name" name='username' autoComplete="new-password" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <i className="email"><SlUserFollowing /></i>
                        </div>
                        <div className="input_box">
                            <input type="text" placeholder="Enter your Department" name='lname' autoComplete="new-password" value={department} onChange={(e) => setDepartment(e.target.value)}/>
                            <i className="email"><SlUserFollowing /></i>
                        </div>
                        <div className="input_box">
                            <input type="email" placeholder="Enter your Email" name='email' autoComplete="new-password" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <i className="email"><SlEnvolope /></i>
                        </div>
                        <div className="input_box">
                            <input type="password" placeholder="Create password" name='password' autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <i className="password"><MdLockOutline/></i>
                            <i className="pw_hide" onClick={handlePwToggle}><MdRemoveRedEye /></i>
                        </div>
                        <button className="btn-button">Signup</button>
                    </form>
                </div>
                <div className="login_signup">
                    Already have an account? {''} <Link to="" onClick={onLogin} >Login</Link>
                </div>
            </div>
    )
}

export default Signup
