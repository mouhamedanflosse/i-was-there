import { actionType } from "../constants/actionType"
const auth = (auth = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify(action?.data));
      return { ...auth, authData: action?.data };
    case actionType.logOut:
      localStorage.clear();
      return { ...auth, authData: null };
    default:
      return auth;
  }
};
export default auth;



