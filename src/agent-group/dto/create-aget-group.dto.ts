import { status } from "@/interfaces";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CreateAgentGroupDto {
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name: string;

  @IsString({ message: "Status must be either active or inactive" })
  status: status;
}
