import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export class BcryptjsAdapter {
  private static readonly DEFAULT_SALT_ROUNDS = 10;
  constructor() {}

  static hashPassword(
    password: string,
    saltRounds: number = BcryptjsAdapter.DEFAULT_SALT_ROUNDS,
  ) {
    const salt = genSaltSync(saltRounds);
    return hashSync(password, salt);
  }

  static comparePasswords(password: string, passwordHash: string) {
    return compareSync(password, passwordHash);
  }
}
