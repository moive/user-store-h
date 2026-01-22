import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService, EmailService } from "../services";
import { envs } from "../../config";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL,
    );
    const authService = new AuthService(emailService);

    const { registerUser, loginUser, validateEmail } = new AuthController(
      authService,
    );

    router.post("/login", loginUser);
    router.post("/register", registerUser);
    router.get("/validate-email/:token", validateEmail);

    return router;
  }
}
