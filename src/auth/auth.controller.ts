import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  InternalServerErrorException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ResponseProps } from "@/interfaces";
import { comparePassword, generateJWTToken } from "@/lib";
import { RegisterDto } from "./dto/register.dto";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.findUserByEmail(loginDto);

      if (!user) {
        return {
          status: 401,
          message: "Invalid credentials",
        };
      }

      const isPasswordValid = await comparePassword(
        loginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        return {
          status: 401,
          message: "Invalid credentials",
        };
      }

      const { password, ...responseData } = user;

      const token = generateJWTToken(responseData);

      return {
        status: 200,
        message: "Login successful",
        token,
        data: responseData,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    try {
      const isUserExist = await this.authService.findUserByEmail(registerDto);

      if (isUserExist) {
        return {
          status: 401,
          message: "User already exist with this email",
        };
      }

      const user = await this.authService.createUser(registerDto);

      if (!user) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      const { password, ...responseData } = user;

      const token = generateJWTToken(responseData);

      return {
        status: 201,
        message: "User created successfully",
        token,
        data: responseData,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}
