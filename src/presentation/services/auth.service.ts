import { BcryptjsAdapter } from "../../adapters";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserModel } from "../../models";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);
      user.password = BcryptjsAdapter.hashPassword(registerUserDto.password);
      user.save();

      const { password, ...rest } = UserEntity.fromObject(user);

      return {
        user: rest,
        token: "ABC",
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });

    if (!user) throw CustomError.badRequest("Email is not exist");

    try {
      // const user = new UserModel(loginUserDto);
      const isMatch = BcryptjsAdapter.comparePasswords(
        loginUserDto.password,
        user.password!,
      );

      if (!isMatch) throw CustomError.badRequest("Passwords in not match");

      const { password, ...rest } = UserEntity.fromObject(user);

      return {
        user: rest,
        token: "ABC",
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
