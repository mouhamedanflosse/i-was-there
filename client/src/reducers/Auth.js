import { actionType } from "../constants/actionType"
const auth = (auth = { authData: null ,loading :false}, action) => {
  switch (action.type) {
    case actionType.start_loading:
      return {...auth, loading : true}
    case actionType.end_loading:
      return {...auth, loading : false}
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify(action?.data));
      return { ...auth, authData: action?.data };
    case actionType.logOut:
      localStorage.removeItem("profile");
      return { ...auth, authData: null };
    default:
      return auth;
  }
};
export default auth;



