import axios from 'axios';

const users = (state = [], action) => {
  if (action.type === 'SET_USERS') {
    state = action.users;
  }
//   if (action.type === 'UPDATE_USER') {
//     state = state.map((user) => 
//     user.id === action.user.id ? action.user : user
//     );
//   }
  return state;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    dispatch({ type: 'SET_USERS', users: response.data });
  };
};

// export const editUser = (user) => {
//     return async (dispatch) => {
//       const response = await axios.put(`/api/users/${user.id}`, user);
//       dispatch({ type: 'UPDATE_USER', user: response.data });
//     };
//   };
  
export default users;
