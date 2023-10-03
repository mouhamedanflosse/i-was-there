import * as api from "../api/index";
import { actionType } from "../constants/actionType"

// get all posts
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type : actionType.start_loading})
    const { data } = await api.fetchPosts(page);
    await dispatch({ type: actionType.fetch_all, payload: data });
    dispatch({type : actionType.end_loading})
  } catch (err) {
    console.log(err);
  }
};
// get specific post
export const getPostsById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsById(id);
    dispatch({ type: actionType.fetch_all, payload: data });
  } catch (err) {
    console.log(err);
  }
};
// search about posts
export const getBySearch = (query) => async (dispatch) => {
  try {
    dispatch({type : actionType.start_loading})
    const { data } = await api.fetchPostsBySearch(query);
    dispatch({ type: actionType.search, payload: data });
    dispatch({type : actionType.end_loading})
  } catch (err) {
    console.log(err);
  }
};

// craete post
export const CreatePost = (newPosts) => async (dispatch) => {
  try {
    dispatch({type : actionType.start_loading})
    const { data } = await api.createPosts(newPosts);
    dispatch({ type: actionType.create, payload: data });
    dispatch({type : actionType.end_loading})
  } catch (err) {
    console.log(err);
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({type : actionType.start_loading})
    const { data } = await api.DeletePost(id);
    dispatch({ type: actionType.delete, payload: data });
    dispatch({type : actionType.end_loading})
  } catch (err) {
    console.log(err);
  }
};

// update post
export const updatePost = (updatedPost) => async (dispatch) => {
  try {
    dispatch({type : actionType.start_loading})
    const { data } = await api.updatePost(updatedPost);
    dispatch({ type: actionType.update, payload: data });
    dispatch({type : actionType.end_loading})
  } catch (err) {
    console.log(err);
  }
};
// like post
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: actionType.update, payload: data });
  } catch (err) {
    console.log(err);
  }
};
