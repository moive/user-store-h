import { Router } from "express";
import { AuthController } from "./auth.controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const { registerUser, loginUser, validateEmail } = new AuthController();

    router.post("/login", loginUser);
    router.post("/register", registerUser);
    router.get("/validate-email/:token", validateEmail);

    return router;
  }
}
