import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import users from './users';
import services from "./service";

export const getToken = () => {
  return window.localStorage.getItem('token');
};

export const setToken = (data) => {
  return window.localStorage.setItem('token', data);
};

const reducer = combineReducers({
  auth,
  users,
  services,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from './users';