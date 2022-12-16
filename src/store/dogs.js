import axios from 'axios';

//reducer
const dogs = (state = [], action) => {
  if (action.type === 'GET_DOGS') {
    return action.dogs;
  }
  if (action.type === 'UPDATE_DOG') {
    state = state.map((dog) =>
      dog.id === action.dog.id ? action.dog : dog
    );
  }
  if(action.type === 'CREATE_DOG') {
    state = [...state, action.dog]
  }
  return state;
};

//action creators
const getDogs = (dogs) => {
  return {
    type: 'GET_DOGS',
    dogs,
  };
};

// const updateDog = (dog) => {
//   return {
//     type: 'UPDATE_DOG',
//     dog,
//   };
// };

//thunks
export const fetchDogs = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/dogs');
    dispatch(getDogs(response.data));
  };
};

export const editDog = (dog, navigate) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/dogs/${dog.id}`, dog);
    dispatch({type: 'UPDATE_DOG', dog: (response.data)});
    navigate(-1);
  };
};

export const createDog = (dog, navigate) => {
  return async (dispatch) => {
    const response = await axios.post('/api/dogs', dog);
    dispatch({type: 'CREATE_DOG', dog: response.data});
    navigate(`/users/${response.data.id}`);
  };
};

export default dogs;
