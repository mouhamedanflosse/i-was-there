import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_connection_Url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// fetch all posts
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

// fetch all posts
export const fetchPostsById = (id) => API.get(`/posts/${id}`);

// fetch all post
export const fetchPostsBySearch = (Query) => API.get(`/posts/search?searchQuery=${Query.searchQuery || "none"}&tags=${Query.tags}&page=${Query.page || 1}`);

//  add new post
export const createPosts = (newPosts) => API.post("/posts", newPosts);

//  delete post
export const DeletePost = (id) => API.delete(`posts/${id}`);

//  update post
export const updatePost = (updatedPost) =>
  API.patch(`posts/${updatedPost._id}`, updatedPost);

//  like post
export const likePost = (id) => API.patch(`posts/likePost/${id}`);

//  user sign in
export const signIn = (formData) => API.post(`users/signIn`, formData);

//  user sign up
export const signUp = (formData) => API.post(`users/signUp`, formData);
