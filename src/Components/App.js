import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, loginWithToken } from '../store';
import { fetchDogs } from '../store/dogs';
import { Routes, Route } from 'react-router-dom';
import services, { fetchServices } from '../store/service';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme';
import Home from './Home';
import Login from './Login/Login';
import Nav from './Nav';
import Service from './Service';
import User from './User/User';
import EditUser from './User/EditUser';
import EditDog from './Dog/EditDog'
import CreateDog from './Dog/CreateDog';
import Signup from './Signup';
import ServiceDetails from './ServiceDetails'
import Footer from './Footer';
import Owners from './Owners';
import MyServices from './MyServices';
import OwnerDetails from './OwnerDetails';
import BecomeAWalker from "./BecomeAWalker";
import UpdateService from './UpdateService';

const App = () => {
  const { auth } = useSelector((state) => state);
  const { services } = useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchServices());
    dispatch(fetchUsers());
    dispatch(fetchDogs());
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Nav />
      <div style={{minHeight:'80vh'}}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Service services = {services}/>} />
        <Route path='/services/filter/:id' element={<Service services = { services }/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/users/:id/edit' element={<EditUser />} />
        <Route path='/dogs/:id/edit' element={<EditDog />} />
        <Route path='/createdog' element={<CreateDog />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Link to='/walker/id'>Service Detail</Link> */}
        <Route path="/walkers/:id/services" element={<MyServices />} />
        <Route path="/walker/:id" element={<ServiceDetails />} />
        <Route path="/owners" element={<Owners />} />
        <Route path="/owners/:id" element={<OwnerDetails />} />
        <Route path="/BecomeAWalker" element={<BecomeAWalker />} />
        <Route path="/myservices/card/:id" element={<UpdateService />}/>
      </Routes>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
