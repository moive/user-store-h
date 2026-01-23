import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { ProductService } from "../services";
import { ProductController } from "./product.controller";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const productService = new ProductService();
    const { createProduct, getProducts } = new ProductController(
      productService,
    );

    router.post("/", [AuthMiddleware.ValidateJWT], createProduct);
    router.get("/", getProducts);

    return router;
  }
}
