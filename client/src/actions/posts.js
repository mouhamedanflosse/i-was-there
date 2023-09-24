import * as api from "../api/index";
import { actionType } from "../constants/actionType";

// get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: actionType.fetch_all , payload: data });
  } catch (err) {
    console.log(err);
  }
};

// craete post
export const CreatePost = (newPosts) => async (dispatch) => {
  try {
    const { data } = await api.createPosts(newPosts);
    dispatch({ type: actionType.create , payload: data });
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
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: actionType.update, payload: data });
  } catch (err) {
    console.log(err);
  }
};
