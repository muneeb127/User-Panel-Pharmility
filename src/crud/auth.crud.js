import axios from "axios";
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const LOGIN_URL = "https://localhost:44319/api/jwt";
export const REGISTER_URL = "https://localhost:44319/api/user";


export function login(data) {
  console.log(data);
  return axios.post(LOGIN_URL, {
    username: data.email,
    password: data.password,
    type: "user"
  })
}

export function registerUser(userData) {
  // console.log(userData);
  return axios.post(REGISTER_URL, {
    Name: userData.name,
    Email: userData.email,
    Password: userData.password,
    Contact: userData.contact
  });
}

export function requestPassword(email) {
  return axios.post(REGISTER_URL, { email });
}

export function getUserByToken(authToken) {
  // Authorization head should be fulfilled in interceptor.
  //return axios.get(ME_URL);
  // Set token to ls
  localStorage.setItem('jwtToken', authToken);
  // Set token to Auth header
  setAuthToken(authToken);
  // Decode token to get user data
  const userData = jwt_decode(authToken);
  return userData;
}



export function logoutUser(){
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
};