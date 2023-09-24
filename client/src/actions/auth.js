import * as api from "../api/index";
import { actionType } from "../constants/actionType";

export const signUp = (fromData,navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(fromData)
        dispatch({type : actionType.AUTH,data})
        navigate("/")
    } catch(err) {
        console.log(err)
    }
}
export const signIn = (fromData,navigate) => async (dispatch) => {
    try {
        const {data} = await api.signIn(fromData)
        dispatch({type : actionType.AUTH,data})
        navigate("/")
    } catch(err) {
        console.log(err)
    }
} 