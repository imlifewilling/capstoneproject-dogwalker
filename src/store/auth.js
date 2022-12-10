import axios from 'axios';
import { getToken, setToken } from '.';

const auth = (state = { }, action)=> {
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }
  if(action.type === 'UPDATE_AUTH') {
    state = {...state, auth: action.auth};
  }
  return state;
};

export const logout = ()=> {
  window.localStorage.removeItem('token');
  return { type: 'SET_AUTH', auth: {} };
};

export const loginWithToken = ()=> { //use toke to login
  return async(dispatch)=> {
    const token = getToken(); //first get the token from localStorage
    if(token){                                          //if ther is token
      const response = await axios.get('/api/auth', {   //get the user from server with token
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'SET_AUTH', auth: response.data }); //set the user to the store with name 'auth'
    }
  };
};

export const updateAuth = (auth, navigate)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/auth', auth, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_AUTH', auth: response.data });
    navigate(`/users/${auth.id}`);
  };
};

export const attemptLogin = (credentials, navigate)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth', credentials); //try to get the data (token) from ther server
    window.localStorage.setItem('token', response.data); //after get the token, store it in localStorage
    dispatch(loginWithToken()); //then use this token to login 
    navigate(-1);
  };
};

export const register = (credentials)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth/register', credentials);
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
  };
};

export const logwith3rdParty = (userinfo, navigate) => {
  return async(dispatch) => {
    const response = await axios.post('/api/auth/login/success', userinfo);
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
    navigate('/');
  }
}

export const loginwithGoogle = (userinfo, navigate) => {
  return async (dispatch) => {
    const response = await axios.post('/api/auth/google', userinfo);
    // console.log(response.data)
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
    navigate('/');
  };
};

export const editUser = (user, navigate) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await axios.put('/api/users', user, {
      headers: { authorization: token },
    });
    dispatch({ type: 'UPDATE_AUTH', auth: response.data });
    navigate(`/users/${response.data.id}`);
  };
};

export default auth;
