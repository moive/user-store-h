import { Router } from "express";
import { CategoryController } from "./category.controller";
import { AuthMiddleware } from "../middlewares";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const { createCategory, getCategories } = new CategoryController();

    router.post("/", [AuthMiddleware.ValidateJWT], createCategory);
    router.get("/", getCategories);

    return router;
  }
}
