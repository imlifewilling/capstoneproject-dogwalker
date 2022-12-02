import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { Link, Routes, Route } from 'react-router-dom';

import ServiceDetails from './ServiceDetails'


const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <h1>FS App Template</h1>
      {
        auth.id ? <Home /> : <Login />
      }
      {
        !!auth.id  && (
          <div>
            <nav>
              <Link to='/'>Home</Link>
              {/* <Link to='/walker/id'>Service Detail</Link> */}
            </nav>
            <Routes>
              {/* <Route path="/walker/:id" element={<ServiceDetails/>}/> */}
            </Routes>
          </div>
        )
      }
    </div>
  );
};

export default App;
