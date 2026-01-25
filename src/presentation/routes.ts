import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { CategoryRoutes } from "./category/category.routes";
import { ProductRoutes } from "./products/product.routes";
import { FileUploadRoutes } from "./file-uploader/file-uploader.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/categories", CategoryRoutes.routes);
    router.use("/api/products", ProductRoutes.routes);
    router.use("/api/upload", FileUploadRoutes.routes);

    return router;
  }
}
