import * as api from "../api/index";
import { actionType } from "../constants/actionType";

export const signUp = (fromData, navigate) => async (dispatch) => {
  try {
    dispatch({type : actionType.start_loading})
    const { data } = await api.signUp(fromData);
    await dispatch({ type: actionType.AUTH, data });
    dispatch({type : actionType.end_loading})
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};
export const signIn = (fromData, navigate) => async (dispatch) => {
  try {
    dispatch({type : actionType.start_loading})
    const { data } = await api.signIn(fromData);
    dispatch({ type: actionType.AUTH, data });
    dispatch({type : actionType.end_loading})
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};
