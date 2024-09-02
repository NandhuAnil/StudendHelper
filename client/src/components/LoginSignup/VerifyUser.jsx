import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';
import { MdClose } from "react-icons/md";

function VerifyUser({onRemove , onLogin, onVerifySuccess}) {
    const [userData, setUserData] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setVerificationMessage('');
        }, 4000);

        return () => clearTimeout(timer);

    }, [verificationMessage]);


    const handleVerifyUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/verify', { userData });
                if (res.data && res.data.isVerified) {
                    setVerificationMessage('Verification successful');
                    setUserData('');
                    setTimeout(() => {
                        onVerifySuccess(res.data.role);
                    }, 2000);
                } else {
                    console.error('Verification failed', res.data.message);
                    setVerificationMessage('Verification failed');
                }
        } catch (error) {
            console.error('Verification failed', error);
            setVerificationMessage('Verification failed');
        }
    };
  return (
    <div className="form_container">
        <i className="form_close" onClick={onRemove}><MdClose /></i>
        <div className="form login_form">
            <h2>Get Start</h2>
            {verificationMessage && (
                <div className={`alert ${verificationMessage.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {verificationMessage}
                </div>
            )}
            <form method='POST' onSubmit={handleVerifyUser}>
                <div className="input_box">
                    <input type="text" placeholder="Enter your Security Key" name='verification' autoComplete="new-password" value={userData} onChange={(e) => setUserData(e.target.value)}/>
                </div>
                <button className="btn-button" type="submit">Verify</button>
            </form>
        </div>
        <div className="login_signup">
            Already have an account? {''} <Link to="" onClick={onLogin} >Login</Link>
        </div>
    </div>
  )
}

export default VerifyUser
