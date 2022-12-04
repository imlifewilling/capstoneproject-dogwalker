import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import axios from 'axios';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './Nav';
import Service from './Service';
import User from './User/User';
import ServiceDetails from './ServiceDetails'


const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const auth3party = async() => {
  //     const response = await axios.get('/api/auth/login/success')
  //     const userinfo = { //set the user info from google for setting new user in db
  //         email: response.data.user._json.email,
  //         firstname: response.data.user._json.given_name,
  //         lastname: response.data.user._json.family_name,
  //         password: response.data.user._json.sub
  //     }
  //     dispatch(logwith3rdParty(userinfo))
  //   }
  //   auth3party()
  // }, []);
  
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Service />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users/:id' element={<User />} />
        {/* <Link to='/walker/id'>Service Detail</Link> */}
        {/* <Route path="/walker/:id" element={<ServiceDetails/>}/> */}
      </Routes>
    </div>
  );
};

export default App;
