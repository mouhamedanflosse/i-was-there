import axios from "axios";
 
const url = "http://localhost:5000/"
// fetch all posts
 export const getPosts = () => axios.get(url)

//  add new post
 export const createPosts = (newPosts) => axios.post(url,newPosts)

//  delete post
 export const DeletePost = (id) => axios.delete(`${url}${id}`)

//  update post
 export const updatePost = (updatedPost) => axios.patch(`${url}${updatedPost._id}` , updatedPost)

//  like post
 export const likePost = (id) => axios.patch(`${url}likePost/${id}`)
//  unlike post
 export const unlikePost = (id) => axios.patch(`${url}unlikePost/${id}`)