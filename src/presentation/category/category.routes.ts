import { Router } from "express";
import { CategoryController } from "./category.controller";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const { createCategory, getCategories } = new CategoryController();

    router.post("/", createCategory);
    router.get("/", getCategories);

    return router;
  }
}
