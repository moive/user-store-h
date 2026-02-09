import { Router } from "express";
import { FileUploaderController } from "./file-uploader.controller";
import { FileUploadService } from "../services";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    const { uploadFile, uploadMultipleFiles } = new FileUploaderController(
      new FileUploadService(),
    );

    router.use(FileUploadMiddleware.containFiles);
    router.use(TypeMiddleware.validTypes(["users", "products", "categories"]));

    router.post("/single/:type", uploadFile);
    router.post("/multiple/:type", uploadMultipleFiles);

    return router;
  }
}
