import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Apibaseurl from '../Apibaseurl';

const Login = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const history = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Redirect to profile page if token exists
      history('/profile'); // Replace '/profile' with the actual URL of your profile page
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setEmailError('');
    setPasswordError('');
    setApiError('');

    // Perform validation checks
    if (email.trim() === '') {
      setEmailError('Please enter an email.');
    }

    if (password.trim() === '') {
      setPasswordError('Please enter a password.');
    }

    // If any errors exist, return without submitting
    if (emailError || passwordError) {
      return;
    }

    try {
      // Make the login API request
      const response = await Apibaseurl.post('/auth/login', {
        email,
        password,
      });

      // Process the response as needed
      console.log('Login successful:', response.data);

      // Store the token in local storage
      localStorage.setItem('token', response.data.token);

      // Redirect to the profile page
      history('/profile'); // Replace '/profile' with the actual URL of your profile page
    } catch (error) {
      // Handle login error
      // console.error('Login failed:', error);

      // Set the API error message
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('The emil and password is incorrect! please tryagain ');
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
      <label htmlFor="confirmPassword" className="form-label">
              Email:
            </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          
        />
        {emailError && <p className="field-error">{emailError}</p>}
      </div>
      <div className="form-group">
      <label htmlFor="confirmPassword" className="form-label">
             Password:
            </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        
        />
        {passwordError && <p className="field-error">{passwordError}</p>}
      </div>
      {apiError && <p className="api-error">{apiError}</p>}
      <button type="submit" className="submit-button">
        Submit
      </button>
      <p>
        Don't have an account?{' '}
        <button onClick={toggleForm} className="register-button">
          Register
        </button>
      </p>
    </form>
  );
};

export default Login;
