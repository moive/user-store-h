import { Router } from "express";
import { FileUploaderController } from "./file-uploader.controller";
import { FileUploadService } from "../services";

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    const { uploadFile, uploadMultipleFiles } = new FileUploaderController(
      new FileUploadService(),
    );

    router.post("/single/:type", uploadFile);
    router.post("/multiple/:type", uploadMultipleFiles);

    return router;
  }
}
