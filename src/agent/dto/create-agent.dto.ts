import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CreateAgentDto {
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name: string;

  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @IsString({ message: "Contact number must be a string" })
  contactNumber: string;

  @IsString({ message: "Additional Contact number must be a string" })
  addContactNumber: string;
}
