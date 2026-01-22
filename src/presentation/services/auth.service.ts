import { BcryptjsAdapter, JwtAdapter } from "../../adapters";
import { envs } from "../../config";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserModel } from "../../models";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);
      user.password = BcryptjsAdapter.hashPassword(registerUserDto.password);
      user.save();

      // Sender Email Validation
      await this.sendEmailValidationLink(user.email!);

      const { password, ...rest } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({
        id: user.id,
      });

      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user: rest,
        token,
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

      const token = await JwtAdapter.generateToken({
        id: user.id,
      });

      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user: rest,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer("Error getting token");

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email: <a href="${link}">${link}</a></p>
    `;

    const opts = {
      to: email,
      subject: "Validate your email 👍🙌",
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(opts);
    if (!isSent) throw CustomError.internalServer("Error sending email");

    return true;
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email not in token payload");

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.internalServer("Email not found");

    user.emailValidated = true;

    await user.save();
    return true;
  };
}
