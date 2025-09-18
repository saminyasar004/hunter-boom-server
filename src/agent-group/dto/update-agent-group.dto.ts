import { IsEnum, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { status } from "@/interfaces";

export class UpdateAgentGroupDto {
  @ApiProperty({
    description: "The name of the agent group",
    example: "Support Team",
    required: true,
  })
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name: string;

  @ApiProperty({
    description: "The status of the agent group (active or inactive)",
    enum: ["active", "inactive"],
    example: "active",
    required: true,
  })
  @IsEnum(["active", "inactive"], {
    message: "Status must be either active or inactive",
  })
  status: status;
}
