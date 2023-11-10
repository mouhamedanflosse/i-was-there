import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_connection_Url });

//  user sign in
export const signIn = (formData) => API.post(`users/signIn`, formData);

//  user sign up
export const signUp = (formData) => API.post(`users/signUp`, formData);

//  user useing google 
export const googleAuth = (accessToken) => API.post(`users/googleAuth`, accessToken);
