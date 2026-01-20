import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";
import { AuthService } from "../services";

export class AuthController {
  // DI
  constructor(public readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => console.log(error));
  };

  loginUser = (req: Request, res: Response) => {
    res.json("login user");
  };

  validateEmail = (req: Request, res: Response) => {
    res.json("validate email");
  };
}
