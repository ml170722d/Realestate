import { Router } from "express";
import LocationController from "../controllers/location.controller";
import PostController from "../controllers/post.controller";

const locRouter = Router();

locRouter.route("").get((req, res) => {
  const { id } = req.query;
  if (id) new LocationController().get(req, res);
  else new LocationController().all(req, res);
});

locRouter.route("").post((req, res) => {
  new LocationController().add(req, res);
});

locRouter.route("").delete((req, res) => {
  new LocationController().remove(req, res);
});

export { locRouter };
