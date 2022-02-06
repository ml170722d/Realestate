import { Router } from "express";
import { postRouter } from "./post.router";
import { userRouter } from "./user.router";

const serverRouter = Router();

serverRouter.use("/user", userRouter);
serverRouter.use("/post", postRouter);

export { serverRouter };
