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

// get all posts 
export const getPosts = async (page) => API.get(`/posts?page=${page}`);

// get post by id
export const getPostsById = async (id) => API.get(`/posts/${id}`);

// get posts by seaching
export const getPostsBySearch = async (Query) =>
  API.get(
    `/posts/search?searchQuery=${Query.searchQuery || "none"}&tags=${
      Query.tags
    }&page=${Query.page || 1}`
  );

// like post
export const likePost = async (id) => API.patch(`posts/likePost/${id}`);

// create post
export const createPost = async (newPost) => API.post(`/posts`,newPost)

// update post
export const updatePost = async (newPost) => API.patch(`/posts/${newPost._id}`,newPost)

// update post
export const deletePost = async (id) => API.delete(`/posts/${id}`)


// ------------------comment section 
// add comments
export const addComment = (value) => API.post(`/posts/${value.id}/postComment`,value.comment);

// delete comment 
export const deletePostComment = (id,postId) => API.post(`/posts/${id}/deleteComment`, {postId});

// update comment 
export const updatePostComment = (id,comment) => API.post(`/posts/${id}/updateComment`, comment);

// -------------------simailar post section
export const getSimilarPosts = (post) => API.post(`/posts/similarPosts`, post);
