import * as api from "../api/index";
import { actionType } from "../constants/actionType";

// get all posts
export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page);
    await dispatch({ type: actionType.fetch_all, payload: data });
  } catch (err) {
    console.log(err);
  }
};
// create Comment
export const createComment = (value) => async (dispatch) => {
  try {
    const { data } = await api.addComment(value);
    console.log(data);
    
    // await dispatch({ type: actionType.fetch_all, payload: data });
  } catch (err) {
    console.log(err);
  }
};
// get specific post
export const getPostsById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsById(id);
    dispatch({ type: actionType.fetch_post, payload: data });
    console.log("dispatching done")
  } catch (err) {
    console.log(err);
  }
};
// search about posts
export const getBySearch = (query) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsBySearch(query);
    dispatch({ type: actionType.search, payload: data });
  } catch (err) {
    console.log(err);
  }
};

// craete post
export const CreatePost = (newPosts) => async (dispatch) => {
  try {
    const { data } = await api.createPosts(newPosts);
    dispatch({ type: actionType.create, payload: data });
  } catch (err) {
    console.log(err);
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.DeletePost(id);
    dispatch({ type: actionType.delete, payload: data });
  } catch (err) {
    console.log(err);
  }
};

// update post
export const updatePost = (updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(updatedPost);
    dispatch({ type: actionType.update, payload: data });
  } catch (err) {
    console.log(err);
  }
};
// like post
export const likePost = (id, like_type) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    if (like_type === "single") {
      dispatch({ type: actionType.like_post, payload: data });
    } else {
      dispatch({ type: actionType.update, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};
