import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "../services";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authService = new AuthService();

    const { registerUser, loginUser, validateEmail } = new AuthController(
      authService,
    );

    router.post("/login", loginUser);
    router.post("/register", registerUser);
    router.get("/validate-email/:token", validateEmail);

    return router;
  }
}
