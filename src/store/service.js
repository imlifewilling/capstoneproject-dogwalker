import axios from "axios";

const services = (state = [], action) => {
  if (action.type === "SET_SERVICES") {
    return action.payload;
  }
  if (action.type === 'ADD_SERVICE'){
    return [...state, action.service];
  }
  return state;
};

export const fetchServices = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/fetchdata/services");
    dispatch({ type: "SET_SERVICES", payload: response.data });
  };
};

export const addService = (input) => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token');
    console.log(input)
    const response = await axios.post('/api/fetchdata/service', input, {
      headers: {
          authorization: token
      }});
    dispatch({type:'ADD_SERVICE', service: response.data});
  };
};

export default services;
