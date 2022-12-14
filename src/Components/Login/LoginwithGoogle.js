import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { loginwithGoogle } from '../../store';
import { useNavigate } from 'react-router-dom';


const LoginwithGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCallbackResponse = (response) => {
    const info = jwtDecode(response.credential);
    const userinfo = {
      email: info.email,
      firstname: info.given_name,
      lastname: info.family_name, 
      password: info.sub,
    };
    dispatch(loginwithGoogle(userinfo, navigate));
  };

  useEffect(() => {
    /* golabal google */
    google.accounts.id.initialize({
      client_id: process.env.GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'filled_blue',
      size: 'large',
      logo_alignment: 'left',
      width: '200',
    });
  }, []);
  return (
    <>
      <div id="signInDiv"></div>
      <div style = {{height: 15}}></div>
    </>
    
  );
};

export default LoginwithGoogle;

