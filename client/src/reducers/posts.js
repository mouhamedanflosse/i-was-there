const posts = (state = { loading: false }, action) => {
  switch (action.type) {
    case "start_loading":
      return { ...state, loading: true };
    case "end_loading":
      return { ...state, loading: false };
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
    case "search":
      return { ...state, ...action.payload };
    case "create":
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state;
  }
};
export default posts;
