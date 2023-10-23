import * as api from "../api/index";
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
    toast.error(err.response.data.error.message)
  }
};
export const signIn = (fromData, navigate,location) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.signIn(fromData);
    dispatch({ type: actionType.AUTH, data });
    dispatch({ type: actionType.end_loading });
    navigate(-1);
  } catch (err) {
    dispatch({ type: actionType.end_loading });
    toast.error(err.response.data.error.message)
};
}
export const googleAuth = (fromData) => async (dispatch) => {
  try {
    dispatch({ type: actionType.start_loading });
    const { data } = await api.googleAuthentication(fromData);
    dispatch({ type: actionType.AUTH, data });
    dispatch({ type: actionType.end_loading });
  } catch (err) {
    dispatch({ type: actionType.end_loading });
  }
};
