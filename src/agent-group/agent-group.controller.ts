import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AgentGroupService } from "./agent-group.service";
import { CreateAgentGroupDto } from "./dto/create-agent-group.dto";
import { UpdateAgentGroupDto } from "./dto/update-agent-group.dto";

@ApiTags("agent-groups")
@Controller("api/agent-group")
export class AgentGroupController {
  constructor(private readonly agentGroupService: AgentGroupService) {}

  @Get()
  @ApiOperation({ summary: "Get all agent groups" })
  @ApiResponse({
    status: 200,
    description: "Agent groups retrieved successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: {
          type: "string",
          example: "Agent groups retrieved successfully",
        },
        data: {
          type: "array",
          items: {
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
    },
  })
  async getAgentGroups() {
    try {
      const agentGroups = await this.agentGroupService.getAgentGroups();

      if (!agentGroups) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 200,
        message: "Agent groups retrieved successfully",
        data: agentGroups,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }

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

  @Put("/:agentGroupId")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Update an agent group by ID" })
  @ApiParam({
    name: "agentGroupId",
    description: "The ID of the agent group to update",
    example: 1,
    required: true,
  })
  @ApiBody({ type: UpdateAgentGroupDto })
  @ApiResponse({
    status: 200,
    description: "Agent group updated successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: {
          type: "string",
          example: "Agent group updated successfully",
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
  async updateAgentGroup(
    @Param("agentGroupId") agentGroupId: number,
    @Body() updateAgentGroupDto: UpdateAgentGroupDto,
  ) {
    try {
      const agentGroup = await this.agentGroupService.editAgentGroup(
        agentGroupId,
        updateAgentGroupDto,
      );

      if (!agentGroup) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 200,
        message: "Agent group updated successfully",
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

  @Delete("/:agentGroupId")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Delete an agent group by ID" })
  @ApiParam({
    name: "agentGroupId",
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
  async deleteAgentGroup(@Param("agentGroupId") agentGroupId: number) {
    try {
      const isDeleted =
        await this.agentGroupService.deleteAgentGroup(agentGroupId);

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
