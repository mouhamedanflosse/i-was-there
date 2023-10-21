import { toast } from "react-toastify";
import * as api from "../api/index";
import { actionType } from "../constants/actionType";

export const signUp = (fromData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.signUp(fromData);
    await dispatch({ type: actionType.AUTH, data });
    dispatch({ type: actionType.end_loading });
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch({ type: actionType.end_loading });
    // if (err.response.data.error.message === "Email is already in use") {
    //   toast.error("Email is already in use");
    // }
  }
};
export const signIn = (fromData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.signIn(fromData);
    dispatch({ type: actionType.AUTH, data });
    dispatch({ type: actionType.end_loading });
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch({ type: actionType.end_loading });
    // if (err.response.data.error.message === "Incorrect password") {
    //   toast.error("Incorrect password");
    // }
    // if (err.response.data.error.message === "Email does not exist") {
    //   toast.error("Email does not exist");
    // }
  }
};
export const googleAuth = (fromData) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.googleAuthentication(fromData);
    dispatch({ type: actionType.AUTH, data });
    dispatch({ type: actionType.end_loading });
  } catch (err) {
    console.log(err);
    dispatch({ type: actionType.end_loading });
    // if (err.response.data.error.message === "Incorrect password") {
    //   toast.error("Incorrect password");
    // }
    // if (err.response.data.error.message === "Email does not exist") {
    //   toast.error("Email does not exist");
    // }
  }
};
