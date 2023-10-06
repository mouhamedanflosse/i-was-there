const posts = (state = {}, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        posts: state.posts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case "delete":
      return {
        ...state,
        posts: state.posts.filter((item) => item._id !== action.payload._id),
      };
    case "fetch_all":
      return { ...state, ...action.payload };
    case "fetch_post":
      return { ...state, post : action.payload };
    case "like_post":
      return { ...state, post : action.payload };
    case "search":
      return { ...state, ...action.payload };
    case "create":
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state;
  }
};
export default posts;
