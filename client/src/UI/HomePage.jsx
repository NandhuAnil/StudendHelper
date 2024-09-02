import React, { useState, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const { Home, Login, Register, Verify} = React.lazy(() => import('../components'));
// import axios from 'axios';
// Importing components using lazy loading
const Home = React.lazy(() => import('../components/Home/home'));
const Login = React.lazy(() => import('../components/LoginSignup/Login'));
const Register = React.lazy(() => import('../components/LoginSignup/Signup'));
const Verify = React.lazy(() => import('../components/LoginSignup/VerifyUser'));


function HomePage() {
    const [activeComponent, setActiveComponent] = useState('');
    const [role, setRole] = useState(''); 

    const RemoveForm = () => {
        setActiveComponent(false);
    };

    const switchToLogin = () => {
        setActiveComponent('login');
    };

    const switchToRegister = () => {
        setActiveComponent('register');
    };
    const switchToVerify = () => {
        setActiveComponent('verify');
    };

    const handleRegister = async (role) => {
        setRole(role); 
        switchToRegister();
    };

  return (
      <div className="homePage">
        <Suspense fallback={<div>Loading...</div>}>
        <ToastContainer />
        <div className={`home ${activeComponent ? 'show' : ''}`}>
            <Home onLogin={switchToLogin} onRegister={handleRegister} onVerify={switchToVerify}/>
            {activeComponent === 'verify' && (
                <Verify onRemove={RemoveForm} onLogin={switchToLogin} onRegister={switchToRegister} onVerifySuccess={handleRegister}/>
            )}
            {activeComponent === 'login' && (
                <Login onRemove={RemoveForm} onRegister={switchToRegister} />
            )}
            {activeComponent === 'register' && (
                <Register onRemove={RemoveForm} onLogin={switchToLogin} role={role}/>
            )}
        </div>
        </Suspense>
    </div>
  )
}

export default HomePage
