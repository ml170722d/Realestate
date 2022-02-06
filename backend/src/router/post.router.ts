import { Router } from "express";
import PostController from "../controller/post.controller";

const postRouter = Router();

const pc = new PostController();

postRouter.route("").get(pc.get);

postRouter.route("/latest").get(pc.latest);

postRouter.route("/update").patch(pc.update);

postRouter.route("/sold").patch(pc.sold);

postRouter.route("/avg").get(pc.avg);

postRouter.route("").post(pc.new);

postRouter.route("/search").get(pc.search);

export { postRouter };
