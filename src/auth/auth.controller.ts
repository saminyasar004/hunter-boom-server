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

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.login(loginDto);

      if (user) {
        const { password, ...responseData } = user;
        return {
          status: 200,
          message: "Login successful",
          data: responseData,
        };
      }

      return {
        status: 401,
        message: "Invalid credentials",
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
