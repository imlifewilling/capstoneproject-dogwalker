import axios from 'axios';

//reducer
const dogs = (state = [], action) => {
  if (action.type === 'GET_DOGS') {
    return action.dogs;
  }
//   if (action.type === 'ADD_REVIEW') {
//     return [...state, action.review];
//   }
//   if (action.type === 'DELETE_REVIEW') {
//     console.log(state);
//     return state.filter((review) => review.id !== action.review.id);
//   }
//   if (action.type === 'UPDATE_REVIEW') {
//     return state.map((review) =>
//       review.id === action.review.id ? action.review : review
//     );
//   }
  return state;
};

//action creators
const getDogs = (dogs) => {
  return {
    type: 'GET_DOGS',
    dogs,
  };
};

// const addReview = (review) => {
//   return {
//     type: 'ADD_REVIEW',
//     review,
//   };
// };

// const removeReview = (review) => {
//   return {
//     type: 'DELETE_REVIEW',
//     review,
//   };
// };

// const updateReview = (review) => {
//   return {
//     type: 'UPDATE_REVIEW',
//     review,
//   };
// };

//thunks
export const fetchDogs = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/dogs');
    dispatch(getDogs(response.data));
  };
};

// export const createReview = (review) => {
//   return async (dispatch) => {
//     const response = await axios.post('/api/reviews', review);
//     dispatch(addReview(response.data));
//   };
// };

// export const deleteReview = (review) => {
//   return async (dispatch) => {
//     console.log(review.id);
//     await axios.delete(`/api/reviews/${review.id}`);
//     dispatch(removeReview(review));
//   };
// };

// export const editReview = (review) => {
//   console.log(review);
//   return async (dispatch) => {
//     const response = await axios.put(`/api/reviews/${review.id}`, review);
//     dispatch(updateReview(response.data));
//   };
// };

export default dogs;
