import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserModel } from "../../models";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);
      user.save();

      const { password, ...rest } = UserEntity.fromObject(user);

      return {
        user: rest,
        token: "ABC",
      };

      return user;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
