import mongoose from "mongoose";
import psotsmessages from "../model/postsSchema.js";
import createHttpError from "http-errors";
const postsContoroller = {
  getPosts: async (req, res, next) => {
    const { page } = req.query;
    const limit = 8;
    try {
      const satrtingTndex = (Number(page) - 1) * limit;
      const posts = await psotsmessages
        .find({}, { __v: 0 })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(satrtingTndex);
      const total = await psotsmessages.countDocuments({});
      res.send({
        posts,
        currentPage: Number(page),
        numberOfpages: Math.ceil(total / limit),
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  getPostsById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const posts = await psotsmessages.findById(id, { __v: 0 });
      if (!posts) {
        throw createHttpError(404, "this post not exist");
      }
      res.send(posts);
    } catch (err) {
      if (err instanceof mongoose.CastError) {
        next(createHttpError(400, "invalid id"));
      }
      next(createHttpError(err));
    }
  },
  getPostsBysearch: async (req, res, next) => {
    const { tags, searchQuery, page } = req.query;
    const title = new RegExp(searchQuery, "i");
    try {
      const limit = 8;
      const satrtingTndex = (Number(page) - 1) * limit;
      const posts = await psotsmessages
        .find({
          $or: [{ title }, { tags: { $in: tags.split(",") } }],
        })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(satrtingTndex);
      const total = await psotsmessages.countDocuments({
        $or: [{ title }, { tags: { $in: tags.split(",") } }],
      });
      if (!posts) {
        throw createHttpError(404, "this post not exist");
      }
      res.send({
        posts,
        currentPage: Number(page),
        numberOfpages: Math.ceil(total / limit),
      });
    } catch (err) {
      next(createHttpError(err));
    }
  },
  getSimilarPosts: async (req, res, next) => {
    const { tags, title, _id: id } = req.body;
    try {
      const limit = 4;
      let similar_post = await psotsmessages
        .find({
          $or: [{ title }, { tags: { $in: tags } }],
        })
        .sort({ _id: -1 })
        .limit(limit);
      similar_post = await similar_post.filter(
        (post) => String(post._id) !== id
      );
      if (similar_post.length === 0) {
        similar_post = await psotsmessages
          .find({}, { _v: 0 })
          .sort({ _id: 1 })
          .limit(limit);
      }
      res.send(similar_post);
    } catch (err) {
      next(createHttpError(err));
    }
  },
  createPost: async (req, res, next) => {
    const post = req.body;
    try {
      if (!req.userId) {
        return res.send({ message: "please sign in" });
      }
      const newPost = new psotsmessages({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
      });
      const createdPost = await newPost.save();
      res.send(createdPost);
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
      const post = await psotsmessages.findByIdAndDelete(id);
      if (!post) {
        throw createHttpError(404, "post does not exist");
      }
      res.send(post);
    } catch (err) {
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
      const post = await psotsmessages.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!post) {
        throw createHttpError(404, "post does not exist");
      }
      res.send(post);
    } catch (err) {
      console.log(err.message);
      if (err instanceof mongoose.CastError) {
        next(createHttpError(422, "invalid id"));
        return;
      }
      next(createHttpError(err));
    }
  },
  CommentPost: async (req, res, next) => {
    const id = req.params.id;
    const comment = req.body;
    try {
      const post = await psotsmessages.findById(id, { __v: 0 });
      if (!post) {
        throw createHttpError(404, "post does not exist");
      }
      post.comments.push({ ...comment, createdAt: new Date().toISOString() });
      const updatedPost = await psotsmessages.findByIdAndUpdate(id, post, {
        new: true,
      });
      res.send(updatedPost);
    } catch (err) {
      console.log(err.message);
      next(createHttpError(err));
    }
  },
  UpdateComment: async (req, res, next) => {
    const id = req.params.id;
    const { commentText, postId } = req.body;
    try {
      const post = await psotsmessages.findById(postId, { __v: 0 });
      if (!post) {
        throw createHttpError(404, "post does not exist");
      }
      post.comments.map((comment) =>
        String(comment._id) === id
          ? (comment.commentText = commentText)
          : comment
      );
      const updatedPost = await psotsmessages.findByIdAndUpdate(postId, post, {
        new: true,
      });
      res.send(updatedPost);
    } catch (err) {
      console.log(err.message);
      next(createHttpError(err));
    }
  },
  deleteComment: async (req, res, next) => {
    const id = req.params.id;
    const { postId } = req.body;

    try {
      const post = await psotsmessages.findById(postId, { __v: 0 });
      if (!post) {
        throw createHttpError(404, "post does not exist");
      }
      post.comments = await post.comments.filter(
        (comment) => id !== String(comment._id)
      );
      const updatedPost = await psotsmessages.findByIdAndUpdate(postId, post, {
        new: true,
      });
      res.send(updatedPost);
    } catch (err) {
      console.log(err.message);
      next(createHttpError(err));
    }
  },
  likePost: async (req, res, next) => {
    const id = req.params.id;
    try {
      if (!req.userId) {
        throw createHttpError(401, "please log in");
      }
      const post = await psotsmessages.findById(id);
      if (!post) {
        throw createHttpError(404, "post does not exist");
      }
      const index = post.likes.findIndex((id) => id === String(req.userId));
      if (index === -1) {
        post.likes.push(req.userId);
      } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
      }
      const likedPost = await psotsmessages.findByIdAndUpdate(id, post, {
        new: true,
      });
      res.send(likedPost);
    } catch (err) {
      if (err instanceof mongoose.CastError) {
        next(createHttpError(422, "invalid id"));
        return;
      }
      next(createHttpError(err));
    }
  },
};
export default postsContoroller;
