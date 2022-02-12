import express from "express";

const publicRouter = express.Router();

publicRouter.use("/public", express.static("public"));

export { publicRouter };
