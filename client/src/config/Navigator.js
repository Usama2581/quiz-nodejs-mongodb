import React, { useState } from 'react'
import Register from '../Pages/register.js/Register'
import Login from '../Pages/login/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from '../Pages/home/Home';
import { useSelector } from 'react-redux';

function Navigator() {
  // const [id, setID] = useState()
  const id = useSelector(state => state.userReducer.user)
  
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path='/home' element={protectedRoute(id, <Home />)} />
      </Routes>
    </Router>
  )
}

function protectedRoute(id, component, navigateTo = '/') {
  return id ? component : <Navigate to={navigateTo} />
}

export default Navigator;