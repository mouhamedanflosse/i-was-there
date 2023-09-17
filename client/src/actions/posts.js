import * as api from "../api/index";

// get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({ type: "fetch_all", payload: data });
  } catch (err) {
    console.log(err);
  }
};

// craete post
export const CreatePost = (newPosts) => async (dispatch) => {
  try {
    const { data } = await api.createPosts(newPosts);
    dispatch({ type: "create", payload: data });
  } catch (err) {
    console.log(err);
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.DeletePost(id);
    dispatch({ type: "delete", payload: data });
  } catch (err) {
    console.log(err); 
  }
};

// update post
export const updatePost = (updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(updatedPost);
    dispatch({ type: "update", payload: data });
  } catch (err) {
    console.log(err);
  }
};
// like post
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "like", payload: data });
  } catch (err) {
    console.log(err);
  }
};
// unlike post
export const unlikePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.unlikePost(id);
    dispatch({ type: "like", payload: data });
  } catch (err) {
    console.log(err);
  }
};
