import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Main from './Main';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');
    const isValidToken = !!token; // Check if the token is valid (not null or empty string)

    if (!isValidToken) {
      navigate('/'); // Redirect to the login page if the token is not valid
    }
  }, [navigate]);

  return (
    <>
      {localStorage.getItem('token') ? (
        <Outlet />
      ) : (
        <Main />
      )}
    </>
  );
};

export default Index;
