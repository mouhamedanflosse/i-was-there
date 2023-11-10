import * as api from "../api/posts";
import { actionType } from "../constants/actionType";
import toast from "react-hot-toast";

// get all posts
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.getPosts(page);
    dispatch({ type: actionType.fetch_all, data });
    dispatch({ type: actionType.end_loading });
  } catch (err) {
    dispatch({ type: actionType.end_loading });
    console.log(err);
  }
};

// search about posts
export const getBySearch = (query) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.getPostsBySearch(query);
    dispatch({ type: actionType.fetch_all, data });
    dispatch({ type: actionType.end_loading });
  } catch (err) {
    dispatch({ type: actionType.end_loading });
    console.log(err);
  }
};

// like post
export const likePost = (post, like_type) => async (dispatch) => {
  try {
    dispatch({ type: actionType.update, data: post });
    const { data } = await api.likePost(post._id);
    if (like_type === "single") {
      dispatch({ type: actionType.fetch_post, data });
    }
    dispatch({ type: actionType.update, data });
  } catch (err) {
    console.log(err);
  }
};

// create Comment
export const createComment = (value,post) => async (dispatch) => {
  try {
    await dispatch({ type: actionType.update, data : post });
    await dispatch({ type: actionType.fetch_post, data : post });
    const {data} = await api.addComment(value)
    await dispatch({ type: actionType.update, data  });
    await dispatch({ type: actionType.fetch_post, data  });
  } catch (err) {
    console.log(err);
  }
};
// update Comment
export const updateComment = (commentID, comment,post) => async (dispatch) => {
  try {
    await dispatch({ type: actionType.update, data : post });
    await dispatch({ type: actionType.fetch_post, data : post });
    const {data} = await api.updatePostComment(commentID, comment)
    await dispatch({ type: actionType.update, data  });
    await dispatch({ type: actionType.fetch_post, data });
  } catch (err) {
    console.log(err);
  }
};

// delete Comment
export const DeleteComment = (id, post) => async (dispatch) => {
  try {
    await dispatch({ type: actionType.update, data : post });
    await dispatch({ type: actionType.fetch_post, data : post });
    const { data } = await api.deletePostComment(id, post._id);
    await dispatch({ type: actionType.update, data  });
    await dispatch({ type: actionType.fetch_post, data  });
  } catch (err) {
    console.log(err);
  }
};

// get specific post
export const getPostsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.getPostsById(id);
    dispatch({ type: actionType.fetch_post, data });
    dispatch({ type: actionType.end_loading });
  } catch (err) {
    dispatch({ type: actionType.end_loading });
    console.log(err);
  }
};

// create post
export const CreatePost = (newPosts) => async (dispatch) => {
  try {
    const promise = api.createPost(newPosts);
    toast
      .promise(promise, {
        loading: "creating...",
        success: <b>created</b>,
        error: <b>Could not create the post</b>,
      })
      .then((response) => {
        dispatch({ type: actionType.create, data: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

// delete post
export const deletePost = (post) => async (dispatch) => {
  try {
    dispatch({ type: actionType.delete, data: post });
    const { data } = await api.deletePost(post._id);
    dispatch({ type: actionType.delete, data });
  } catch (err) {
    console.log(err);
  }
};

// update post
export const updatePost = (updatedPost) => async (dispatch) => {
  try {
    dispatch({ type: actionType.update, data: updatedPost });
    const { data } = await api.updatePost(updatedPost);
    dispatch({ type: actionType.update, data });
  } catch (err) {
    console.log(err);
  }
};

// get similar  posts
export const getsimilarPost = (post) => async (dispatch) => {
  try {
    const {data} = await api.getSimilarPosts(post)
    dispatch({type : actionType.similar_posts , data})
  } catch (err) {
    console.log(err);
  }
};
