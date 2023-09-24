import express from "express";
import auth from "../middleware/auth.js";

import postsContoroller from "../controllers/posts.js";

const route = express.Router();

route.get("/", postsContoroller.getPosts);

route.post("/", auth, postsContoroller.createPost);

route.delete("/:id", auth, postsContoroller.DeletePost);

route.patch("/:id", auth, postsContoroller.updatePost);

route.patch("/likePost/:id", auth, postsContoroller.likePost);

route.get("/:id", postsContoroller.getPostsById);

export default route;
