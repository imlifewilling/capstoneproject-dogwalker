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
import EditUser from './User/EditUser';
import ServiceDetails from './ServiceDetails'
import { fetchServices } from '../store/service';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const googleUser = async() => {
  //     const response = await axios.get('/api/auth/login/success')
  //     return response.data
  //   }
  //   const data = googleUser();
  //   console.log(data);
  // }, [])

  useEffect(()=> {
    dispatch(loginWithToken());
    dispatch(fetchServices());
  }, []);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Service />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/users/:id/edit' element={<EditUser />} />
        {/* <Link to='/walker/id'>Service Detail</Link> */}
        <Route path="/walker/:id" element={<ServiceDetails/>}/>
      </Routes>
    </div>
  );
};

export default App;
