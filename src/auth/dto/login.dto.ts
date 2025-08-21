import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class LoginDto {
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
}
