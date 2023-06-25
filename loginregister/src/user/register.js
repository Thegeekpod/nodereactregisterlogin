import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Apibaseurl from '../Apibaseurl';

const Register = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [apiError, setApiError] = useState('');
  const history = useNavigate();

  useEffect(() => {
    let timer;
    if (registrationSuccess) {
      timer = setTimeout(() => {
        toggleForm(); // Switch to the login form
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [registrationSuccess, toggleForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setApiError('');

    // Perform validation checks
    if (username.trim() === '') {
      setUsernameError('Please enter a username.');
    }

    if (email.trim() === '') {
      setEmailError('Please enter an email.');
    }

    if (password.trim() === '') {
      setPasswordError('Please enter a password.');
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Please confirm your password.');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
    }

    // If all fields are valid, proceed with registration logic
    if (
      username.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword
    ) {
      try {
        // Make the registration API request
        const response = await Apibaseurl.post('/auth/register', {
          username,
          email,
          password,
        });

        // Process the response as needed
        console.log('Registration successful:', response.data);
        setRegistrationSuccess(true);
      } catch (error) {
        // Handle registration error
        console.error('Registration failed:', error);

        // Set the API error message
        if (error.response && error.response.data && error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError('email already exists');
        }
      }
    }
  };
  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Redirect to profile page if token exists
      history('/profile'); // Replace '/profile' with the actual URL of your profile page
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="register-form">
      {registrationSuccess ? (
        <>
          <div className="success-message">Registration successful!</div>
          <div className="success-info">Redirecting to login page in 5 seconds...</div>
        </>
      ) : (
        <>
          <h2 className="register-heading">Register</h2>
          {apiError && <p className="api-error">{apiError}</p>}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
            {usernameError && <p className="field-error">{usernameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
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
            <label htmlFor="password" className="form-label">
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
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
            />
            {confirmPasswordError && (
              <p className="field-error">{confirmPasswordError}</p>
            )}
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          <p className="text">
            Already have an account?{' '}
            <button onClick={toggleForm} className="login-link">
              Login
            </button>
          </p>
        </>
      )}
    </form>
  );
};

export default Register;
