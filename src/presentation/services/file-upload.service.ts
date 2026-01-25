import type { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import { UuidAdapter } from "../../adapters";
import { CustomError } from "../../domain";

export class FileUploadService {
  constructor(private readonly uuid = UuidAdapter.v7) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  public async uploadSingle(
    file: UploadedFile,
    folder: string = "uploads",
    validExtensions: string[] = ["jpg", "png", "jpeg", "gif"],
  ) {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";

      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Invalid extension ${fileExtension}, valid ones ${validExtensions}`,
        );
      }

      const destination = path.resolve(__dirname, "../../../", folder);
      this.checkFolder(destination);

      const fileName = `${this.uuid()}.${fileExtension}`;

      file.mv(`${destination}/${fileName}`);

      return { fileName };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  public uploadMultiple(
    file: any[],
    folder: string,
    validExtensions: string[] = ["jpg", "png", "jpeg", "gif"],
  ) {}
}
