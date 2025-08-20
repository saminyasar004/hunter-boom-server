import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto {
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name: string;

  @IsString({ message: "Contact number must be a string" })
  contactNumber: string;

  @IsString({ message: "User group must be a string" })
  userGroup: string;

  @IsString({ message: "User level must be a string" })
  userLevel: string;

  @IsString({ message: "Permission must be a string" })
  permission: string;

  @IsString({ message: "Username must be a string" })
  username: string;

  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Matches(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  password: string;

  @IsString({ message: "Status must be a string" })
  status: string;

  @IsString({ message: "User group must be a string" })
  isDeleted: boolean;
}
