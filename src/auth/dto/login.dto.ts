import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Matches(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  password: string;
}
