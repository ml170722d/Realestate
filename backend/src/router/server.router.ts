import { Router } from "express";
import { fileRouter } from "./file.router";
import { locationRouter } from "./location.router";
import { postRouter } from "./post.router";
import { userRouter } from "./user.router";

const serverRouter = Router();

serverRouter.use("/user", userRouter);
serverRouter.use("/post", postRouter);
serverRouter.use("/loc", locationRouter);
serverRouter.use("/file", fileRouter);

export { serverRouter };
