import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ResponseProps } from "@/interfaces";
import { comparePassword, generateJWTToken } from "@/lib";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("users")
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "Users retrieved successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: { type: "string", example: "Users retrieved successfully" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number", example: 1 },
              name: { type: "string", example: "John Doe" },
              email: { type: "string", example: "admin@example.com" },
            },
          },
        },
      },
    },
  })
  async getUsers() {
    try {
      const users = await this.authService.getUsers();

      if (!users) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      const usersWithoutPassword = users.map((user) => {
        const { password, ...responseData } = user;
        return responseData;
      });

      return {
        status: 200,
        message: "Users retrieved successfully",
        data: usersWithoutPassword,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }

  @Post("login")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Log in a user with email and password" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: "User logged in successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: { type: "string", example: "Login successful" },
        token: { type: "string", example: "jwt.token.here" },
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "admin@example.com" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 401 },
        message: { type: "string", example: "Invalid credentials" },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  async login(@Body() loginDto: LoginDto): Promise<ResponseProps> {
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
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: "User registered successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 201 },
        message: { type: "string", example: "User created successfully" },
        token: { type: "string", example: "jwt.token.here" },
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "admin@example.com" },
            contactNumber: { type: "string", example: "1234567890" },
            userGroup: { type: "string", example: "admin" },
            userLevel: { type: "string", example: "admin" },
            permission: { type: "string", example: "admin" },
            username: { type: "string", example: "admin" },
            status: { type: "string", example: "active" },
            isDeleted: { type: "boolean", example: false },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "User already exists with this email",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 401 },
        message: {
          type: "string",
          example: "User already exist with this email",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  async register(@Body() registerDto: RegisterDto): Promise<ResponseProps> {
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
