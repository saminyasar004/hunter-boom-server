import {
  IsEmail,
  IsString,
  Matches,
  MinLength,
  IsBoolean,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({
    description: "The full name of the user",
    example: "John Doe",
    required: true,
  })
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name: string;

  @ApiProperty({
    description: "The contact number of the user",
    example: "1234567890",
    required: true,
  })
  @IsString({ message: "Contact number must be a string" })
  contactNumber: string;

  @ApiProperty({
    description: "The group to which the user belongs (e.g., admin, user)",
    example: "admin",
    required: true,
  })
  @IsString({ message: "User group must be a string" })
  userGroup: string;

  @ApiProperty({
    description: "The level of the user (e.g., admin, guest)",
    example: "admin",
    required: true,
  })
  @IsString({ message: "User level must be a string" })
  userLevel: string;

  @ApiProperty({
    description: "The permission level of the user (e.g., admin, read-only)",
    example: "admin",
    required: true,
  })
  @IsString({ message: "Permission must be a string" })
  permission: string;

  @ApiProperty({
    description: "The unique username for the user",
    example: "admin",
    required: true,
  })
  @IsString({ message: "Username must be a string" })
  username: string;

  @ApiProperty({
    description: "The email address of the user",
    example: "admin@example.com",
    required: true,
  })
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @ApiProperty({
    description:
      "The user password, must contain at least one uppercase letter, one lowercase letter, and one number",
    example: "admin@12345",
    required: true,
  })
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Matches(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  password: string;

  @ApiProperty({
    description: "The status of the user account (e.g., active, inactive)",
    example: "active",
    required: true,
  })
  @IsString({ message: "Status must be a string" })
  status: string;
}
