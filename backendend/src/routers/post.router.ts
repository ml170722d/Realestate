import { Router } from "express";
import PostController from "../controllers/post.controller";

const subPostRouter = Router();

subPostRouter.route("").post((req, res) => {
  new PostController().add(req, res);
});

subPostRouter.route("").get((req, res) => {
  new PostController().all(req, res);
});

subPostRouter.route("/:id").get((req, res) => {
  new PostController().get(req, res);
});

subPostRouter.route("").patch((req, res) => {
  new PostController().update(req, res);
});

subPostRouter.route("/sold").patch((req, res) => {
  new PostController().markAsSold(req, res);
});

const postRouter = Router();
postRouter.use("/post", subPostRouter);

export { postRouter };
