import { CustomError, RegisterUserDto } from "../../domain";
import { UserModel } from "../../models";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exist");

    return "todo ok";
  }
}
