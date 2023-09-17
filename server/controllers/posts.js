import mongoose from "mongoose";
import psotsMessage from "../model/postsSchema.js";
import createHttpError from "http-errors";

const postsContoroller = {
  getPosts: async (req, res, next) => {
    try {
      const posts = await psotsMessage.find({}, { __v: 0 });
      res.send(posts);
    } catch (err) {
      console.log(err.message);
    }
  },
  getPostsById: async (req, res, next) => {
     const id = req.params.id
    try {
      const posts = await psotsMessage.findById(id, { __v: 0 })
      if (!posts) {
        throw createHttpError(404,"this post not exist")
      }
      res.send(posts);
    } catch (err) {
      if (err instanceof mongoose.CastError) {
        next(createHttpError(400,"invalid id"))
      }
      next(createHttpError(err))
    }
  },
  createPost: async (req, res, next) => {
    const post = req.body;
    const newPost = new psotsMessage(post);
    try {
      const post = await newPost.save();
      res.send(post);
    } catch (err) {
      if (err === "VladitionError") {
        next(createHttpError(422, err.message));
        return;
      }
      next(err);
    }
  },
  DeletePost: async (req, res, next) => {
    const id = req.params.id;
    try {
      const post = await psotsMessage.findByIdAndDelete(id) ;
      if (!post) {
        throw createHttpError(404, "post does not exist")
      }
      res.send(post);
    } catch (err) {
      console.log(err.message)
      if (err instanceof mongoose.CastError) {
        next(createHttpError(422, "invalid id"));
        return;
      }
      next(err);
    }
  },
  updatePost: async (req, res, next) => {
    const id = req.params.id;
    try {
      const post = await psotsMessage.findByIdAndUpdate(id,req.body,{new : true}) ;
      if (!post) {
        throw createHttpError(404, "post does not exist")
      }
      res.send(post);
    } catch (err) {
      console.log(err.message)
      if (err instanceof mongoose.CastError) {
        next(createHttpError(422, "invalid id"));
        return;
      }
      next(createHttpError(err));
    }
  },
  likePost: async (req, res, next) => {
    const id = req.params.id;
    try {
      const post = await psotsMessage.findById(id, { __v: 0 })
      const likedPost = await psotsMessage.findByIdAndUpdate(id,{likeCount : post.likeCount + 1} ,{new : true}) ;
      if (!post) {
        throw createHttpError(404, "post does not exist")
      }
      res.send(likedPost);
    } catch (err) {
      console.log(err.message)
      if (err instanceof mongoose.CastError) {
        next(createHttpError(422, "invalid id"));
        return;
      }
      next(createHttpError(err));
    }
  },
  unlikePost: async (req, res, next) => {
    const id = req.params.id;
    try {
      const post = await psotsMessage.findById(id, { __v: 0 })
      const likedPost = await psotsMessage.findByIdAndUpdate(id,{likeCount : post.likeCount - 1 <= 0 ? 0 : post.likeCount - 1} ,{new : true}) ;
      if (!post) {
        throw createHttpError(404, "post does not exist")
      }
      res.send(likedPost);
    } catch (err) {
      console.log(err.message)
      if (err instanceof mongoose.CastError) {
        next(createHttpError(422, "invalid id"));
        return;
      }
      next(createHttpError(err));
    }
  },
};
export default postsContoroller;
