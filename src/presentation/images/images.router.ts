import { Router } from "express";
import { ImagesController } from "./images.controller";

export class ImagesRouter {
  static get routes(): Router {
    const router = Router();
    const { getImage } = new ImagesController();

    router.get("/:type/:img", getImage);

    return router;
  }
}
