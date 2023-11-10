import { actionType } from "../constants/actionType";
const posts = (state = { loading: false }, action) => {
  switch (action.type) {
    case actionType.start_loading:
      return { ...state, loading: true };
    case actionType.end_loading:
      return { ...state, loading: false };
    case actionType.fetch_all:
      return { ...state, ...action?.data };
    case actionType.fetch_post:
      return { ...state, post : action.data };
    case actionType.create:
      return { ...state, posts: [action?.data, ...state?.posts] };
    case actionType.update:
      return {
        ...state,
        posts: state?.posts.map((post) =>
          post._id === action.data._id ? action.data : post
        ),
      };
      case actionType.delete:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.data._id),
      };
      case actionType.similar_posts:
        return { ...state, similar_posts : action.data };
    default:
      return state;
  }
};
export default posts;
