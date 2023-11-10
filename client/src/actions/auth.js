import * as api from "../api/auth";
import { actionType } from "../constants/actionType";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const signUp = (fromData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.signUp(fromData);
    await dispatch({ type: actionType.AUTH, data });
    dispatch({ type: actionType.end_loading });
    navigate("/");
  } catch (err) {
    dispatch({ type: actionType.end_loading });
    toast.error(err.response.data.error.message);
  }
};

export const signIn = (fromData, navigate, location) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.signIn(fromData);
    await dispatch({ type: actionType.AUTH, data });
    dispatch({ type: actionType.end_loading });
    navigate("/");
  } catch (err) {
    dispatch({ type: actionType.end_loading });
    toast.error(err.response.data.error.message);
  }
};
export const googleAuth = (accessToken) => async (dispatch) => {
  try {
    const { data } = await api.googleAuth(accessToken);
    await dispatch({ type: actionType.AUTH, data });
  } catch (err) {
    dispatch({ type: actionType.end_loading });
    console.log(err)
  }
};
