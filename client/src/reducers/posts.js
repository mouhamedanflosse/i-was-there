 const posts =  (posts = [], action) => {
  switch (action.type) {
    case "update":
      return posts.map((item) => item._id === action.payload._id ? action.payload : item);
    case "delete":
      return posts.filter((item) => item._id !== action.payload._id);
    case "fetch_all":
      return action.payload;
    case "create":
      return [...posts,action.payload];
    default:
      return posts;
  }
};
export default posts