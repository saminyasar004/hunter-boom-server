import {
  Controller,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AgentGroupService } from "./agent-group.service";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiProperty,
} from "@nestjs/swagger";
import { CreateAgentGroupDto } from "./dto/create-aget-group.dto";

class DeleteAgentGroupDto {
  @ApiProperty({
    description: "The ID of the agent group to delete",
    example: 1,
    required: true,
  })
  id: number;
}

@ApiTags("agent-groups")
@Controller("api/agent-group")
export class AgentGroupController {
  constructor(private readonly agentGroupService: AgentGroupService) {}

  @Post("create")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Create a new agent group" })
  @ApiBody({ type: CreateAgentGroupDto })
  @ApiResponse({
    status: 201,
    description: "Agent group created successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 201 },
        message: {
          type: "string",
          example: "Agent group created successfully",
        },
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            name: { type: "string", example: "Support Team" },
            status: {
              type: "string",
              enum: ["active", "inactive"],
              example: "active",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  async createAgentGroup(@Body() createAgentGroupDto: CreateAgentGroupDto) {
    try {
      const agentGroup =
        await this.agentGroupService.createAgentGroup(createAgentGroupDto);

      if (!agentGroup) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 201,
        message: "Agent group created successfully",
        data: agentGroup,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }

  @Post("delete/:id")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Delete an agent group by ID" })
  @ApiParam({
    name: "id",
    description: "The ID of the agent group to delete",
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "Agent group deleted successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: {
          type: "string",
          example: "Agent group deleted successfully",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  async deleteAgentGroup(@Param("id") id: number) {
    try {
      const isDeleted = await this.agentGroupService.deleteAgentGroup(id);

      if (!isDeleted) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 200,
        message: "Agent group deleted successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}
