import express from "express";
import auth from "../middleware/auth.js";

import postsContoroller from "../controllers/posts.js";

const route = express.Router();


route.get("/", postsContoroller.getPosts);

route.get("/search", postsContoroller.getPostsBysearch);

route.post("/", auth, postsContoroller.createPost);

route.delete("/:id", auth, postsContoroller.DeletePost);

route.patch("/:id", auth, postsContoroller.updatePost);

route.patch("/likePost/:id", auth, postsContoroller.likePost);

route.get("/:id", postsContoroller.getPostsById);

route.post("/:id/postComment", postsContoroller.CommentPost);

route.post("/:id/deleteComment", postsContoroller.deleteComment);

route.post("/:id/updateComment", postsContoroller.UpdateComment);

route.post("/similarPosts", postsContoroller.getSimilarPosts);


export default route;
