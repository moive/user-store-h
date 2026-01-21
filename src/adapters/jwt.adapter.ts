import jwt, { SignOptions } from "jsonwebtoken";
import { envs } from "../config";

const JWT_SECRET: string = envs.JWT_SEED;

export class JwtAdapter {
  static generateToken(
    payload: any,
    duration: string = "2h",
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: duration } as SignOptions,
        (err, token) => {
          if (err) return resolve(null);
          resolve(token!);
        },
      );
    });
  }

  static validateToken(token: string) {
    throw new Error("Not implement");
  }
}
