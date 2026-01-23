import { Router } from "express";
import { CategoryController } from "./category.controller";
import { AuthMiddleware } from "../middlewares";
import { CategoryService } from "../services";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryService = new CategoryService();

    const { createCategory, getCategories } = new CategoryController(
      categoryService,
    );

    router.post("/", [AuthMiddleware.ValidateJWT], createCategory);
    router.get("/", getCategories);

    return router;
  }
}
