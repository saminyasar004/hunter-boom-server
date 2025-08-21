import { IsDate, IsEnum, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { status } from "@/interfaces";

export class CreatePromotionDto {
  @ApiProperty({
    description: "The name of the promotion",
    example: "Summer Sale",
    required: true,
  })
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name: string;

  @ApiProperty({
    description: "The status of the promotion (active or inactive)",
    enum: ["active", "inactive"],
    example: "active",
    required: true,
  })
  @IsEnum(["active", "inactive"], {
    message: "Status must be either active or inactive",
  })
  status: status;

  @ApiProperty({
    description: "The start date of the promotion (ISO 8601 format)",
    example: "2025-08-21T10:00:00Z",
    required: true,
  })
  @IsDate({ message: "Start date must be a valid date" })
  startDate: Date;

  @ApiProperty({
    description: "The end date of the promotion (ISO 8601 format)",
    example: "2025-08-31T23:59:59Z",
    required: true,
  })
  @IsDate({ message: "End date must be a valid date" })
  endDate: Date;
}
