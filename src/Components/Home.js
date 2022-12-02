import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <Login />
    </div>
  );
};

export default Home;
