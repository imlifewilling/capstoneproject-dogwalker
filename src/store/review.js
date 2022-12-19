import { CatchingPokemonSharp } from "@mui/icons-material";
import axios from "axios";

const review = (state = [], action) => {
  if(action.type === 'FETCH_REVIEW'){
    return action.reviews;
  }
  if (action.type === 'ADD_REVIEW'){
    return [...state, action.review];
  }
  return state;
};

export const fetchReview = () => {
    return async(dispatch)=>{
        const response = await axios.get('/api/fetchdata/reviews')
        dispatch({type:'FETCH_REVIEW', reviews:response.data})
    }
}

export const addReview = (id,star, comment, navigate) => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/fetchdata/add_review', { walkerId:id,star:star,comment:comment}, {
      headers: {
          authorization: token
      }});
    dispatch({type:'ADD_REVIEW', review: response.data});
    navigate(`/walker/${id}`);
  };
};

export default review;
