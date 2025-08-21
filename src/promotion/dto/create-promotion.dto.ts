import { IsDate, IsEnum, IsString, MinLength } from "class-validator";
import { status } from "@/interfaces";

export class CreatePromotionDto {
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name: string;

  @IsEnum(["active", "inactive"], {
    message: "Status must be either active or inactive",
  })
  status: status;

  @IsDate({ message: "Start date must be a valid date" })
  startDate: Date;

  @IsDate({ message: "End date must be a valid date" })
  endDate: Date;
}
