import express from "express";

import postsContoroller from "../controllers/posts.js";

const route = express.Router();

route.get("/", postsContoroller.getPosts);

route.post("/", postsContoroller.createPost);

route.delete("/:id", postsContoroller.DeletePost);

route.patch("/:id", postsContoroller.updatePost);

route.get("/:id", postsContoroller.getPostsById);

route.patch("/likePost/:id", postsContoroller.likePost);

route.patch("/unlikePost/:id", postsContoroller.unlikePost);

export default route;
