import * as api from "../api/index";
import { actionType } from "../constants/actionType";

// get all posts
export const getPosts = (page) => async (dispatch) => {
  try {
    await dispatch({ type: actionType.start_loading });
    const { data } = await api.fetchPosts(page);
    await dispatch({ type: actionType.fetch_all, payload: data });
    await dispatch({ type: actionType.end_loading });
  } catch (err) {
    console.log(err);
  }
};
// create Comment
export const createComment = (value) => async (dispatch) => {
  try {
    const { data } = await api.addComment(value);
    await dispatch({ type: actionType.fetch_post, payload: data });
  } catch (err) {
    console.log(err);
  }
};
// update Comment
export const updateComment = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePostComment(id, post);
    await dispatch({ type: actionType.fetch_post, payload: data });
  } catch (err) {
    console.log(err);
  }
};
// delete Comment
export const DeleteComment = (id, postId) => async (dispatch) => {
  try {
    const { data } = await api.deletePostComment(id, postId);
    await dispatch({ type: actionType.fetch_post, payload: data });
  } catch (err) {
    console.log(err);
  }
};
// get specific post
export const getPostsById = (id) => async (dispatch) => {
  try {
    await dispatch({ type: actionType.start_loading });
    const { data } = await api.fetchPostsById(id);
    await dispatch({ type: actionType.fetch_post, payload: data });
    dispatch({ type: actionType.end_loading });
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
      await dispatch({ type: actionType.fetch_post, payload: data });
    } else {
      dispatch({ type: actionType.update, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};

// get similar  posts
export const getsimilarPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.getSimilarPosts(post);
    dispatch({ type: actionType.similar_posts, payload: data });
    dispatch({ type: actionType.end_loading });
  } catch (err) {
    console.log(err);
  }
};
