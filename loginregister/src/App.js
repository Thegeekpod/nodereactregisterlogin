import React, { useState } from 'react';
import Login from './user/Login';
import Register from './user/register';
import './App.css';
import Index from './user/Index';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from './user/Profile';
import Main from './user/Main';
const App = () => {
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      
      children: [
        {
          path: "/",
          element: <Main />,
          
        },
        {
          path: "login",
          element: <Login />,
          
        },
        {
          path: "Register",
          element: <Register />,
          
        },
        {
          path: "profile",
          element: <Profile />,
          
        },
      ],
    },
    
 
  ]);
  

  return (
    <RouterProvider router={router}/>
  );
};

export default App;
