import express from "express";
import PostController from "../controllers/post.controller";

const postRouter = express.Router();

postRouter
  .route("/newPost")
  .post((req, res) => new PostController().newPost(req, res));

postRouter
  .route("/getPosts")
  .get((req, res) => new PostController().getPosts(req, res));

postRouter
  .route("/updatePost")
  .post((req, res) => new PostController().updatePost(req, res));

export default postRouter;
