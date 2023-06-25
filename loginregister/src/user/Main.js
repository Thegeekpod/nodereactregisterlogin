import React, { useState, useEffect } from 'react';
import '../App.css';
import Register from './register';
import Login from './Login';
import { useNavigate } from 'react-router-dom';


const Main = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const navigate =useNavigate();
  const toggleForm = () => {
    setActiveForm(activeForm === 'login' ? 'register' : 'login');
  };

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');
    const isValidToken = !!token; // Check if the token is valid (not null or empty string)

    setIsLoggedIn(isValidToken);
  }, []);

  return (
    <div className="container fgd">
      {isLoggedIn ? (
        navigate('/profile')
      ) : (
        <>
          <div>
            <button
              onClick={() => setActiveForm('login')}
              className={activeForm === 'login' ? 'active-button' : 'button'}
            >
              Login
            </button>
            <button
              onClick={() => setActiveForm('register')}
              className={activeForm === 'register' ? 'active-button' : 'button'}
            >
              Register
            </button>
          </div>
          {activeForm === 'login' ? (
            <Login toggleForm={toggleForm} />
          ) : (
            <Register toggleForm={toggleForm} />
          )}
        </>
      )}
    </div>
  );
};

export default Main;
