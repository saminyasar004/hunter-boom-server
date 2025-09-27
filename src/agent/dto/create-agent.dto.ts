import { status } from "@/interfaces";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

/**
 * Data transfer object for creating an agent.
 */
export class CreateAgentDto {
  @ApiProperty({
    description: "The unique code for the agent",
    example: "AGT001",
    required: true,
  })
  @IsString({ message: "Code must be a string" })
  code: string;

  @ApiProperty({ description: "The name of the agent", example: "Agent Name" })
  @IsString({ message: "Name must be a string" })
  agentName: string;

  @ApiProperty({
    description: "The primary contact number of the agent",
    example: "+1234567890",
    required: true,
  })
  @IsString({ message: "Contact number must be a string" })
  contactNumber: string;

  @ApiProperty({
    description: "Additional contact number of the agent",
    example: "+0987654321",
    required: true,
  })
  @IsString({ message: "Additional contact number must be a string" })
  addContactNumber: string;

  @ApiProperty({
    description: "The street address of the agent",
    example: "123 Main St",
    required: true,
  })
  @IsString({ message: "Address must be a string" })
  address: string;

  @ApiProperty({
    description: "The postal code of the agent's address",
    example: "12345",
    required: true,
  })
  @IsString({ message: "Postal code must be a string" })
  addressPostalCode: string;

  @ApiProperty({
    description: "The city of the agent's address",
    example: "New York",
    required: true,
  })
  @IsString({ message: "City must be a string" })
  addressCity: string;

  @ApiProperty({
    description: "The state or region of the agent's address",
    example: "NY",
    required: true,
  })
  @IsString({ message: "State must be a string" })
  addressState: string;

  @ApiProperty({
    description: "The username for the agent's account",
    example: "agent123",
    required: true,
  })
  @IsString({ message: "Username must be a string" })
  username: string;

  @ApiProperty({
    description:
      "The agent's password, must contain at least one uppercase letter, one lowercase letter, and one number",
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
    description: "The ID of the agent group to associate with the agent",
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: "Agent group ID must be a number" })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  agentGroupId: number;

  @ApiProperty({
    description: "The account book identifier for the agent",
    example: "ACC001",
    required: true,
  })
  @IsString({ message: "Account book must be a string" })
  @MinLength(3, { message: "Account book must be at least 3 characters long" })
  accountBook: string;

  @ApiProperty({
    description:
      "The credit limit for the agent (as a string, e.g., currency amount)",
    example: "1000.00",
    required: true,
  })
  @IsString({ message: "Credit limit must be a string" })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: "Credit limit must be a valid currency amount (e.g., 1000.00)",
  })
  creditLimit: string;

  @ApiProperty({
    description: 'The credit term for the agent (e.g., "30 days")',
    example: "30 days",
    required: true,
  })
  @IsString({ message: "Credit term must be a string" })
  @MinLength(3, { message: "Credit term must be at least 3 characters long" })
  creditTerm: string;

  @ApiProperty({
    description: "The status of the agent",
    example: "active",
    required: true,
  })
  @IsString({ message: "Status must be a string" })
  @IsEnum(["active", "inactive"], {
    message: "Status must be one of the following values: active, inactive",
  })
  status: status;
}
