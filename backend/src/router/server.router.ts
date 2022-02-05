import { Router } from "express";
import { userRouter } from "./user.router";

const serverRouter = Router();

serverRouter.use("/user", userRouter);

export { serverRouter };
