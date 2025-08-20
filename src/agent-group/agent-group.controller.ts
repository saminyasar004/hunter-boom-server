import { Body, Controller, Post } from "@nestjs/common";
import { AgentGroupService } from "./agent-group.service";
import { CreateAgentGroupDto } from "./dto/create-aget-group.dto";

@Controller("api/agent-group")
export class AgentGroupController {
  constructor(private readonly agentGroupService: AgentGroupService) {}

  @Post("create")
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

  @Post("delete")
  async deleteAgentGroup(@Body() agentGroupId: number) {
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
