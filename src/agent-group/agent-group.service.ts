import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateAgentGroupDto } from "./dto/create-aget-group.dto";
import AgentGroup, {
  AgentGroupCreationProps,
  AgentGroupProps,
} from "@/model/agent-group.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AgentGroupService {
  constructor(
    @InjectModel(AgentGroup)
    private readonly agentGroupModel: typeof AgentGroup,
  ) {}

  async createAgentGroup(
    createAgentGroupDto: CreateAgentGroupDto,
  ): Promise<AgentGroupProps | AgentGroup | null> {
    try {
      const agentGroup = await this.agentGroupModel.create(createAgentGroupDto);

      if (agentGroup) {
        return agentGroup.toJSON();
      }
      return null;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteAgentGroup(agentGroupId: number): Promise<boolean> {
    try {
      const isDeleted = await this.agentGroupModel.destroy({
        where: {
          agentGroupId,
        },
      });

      if (isDeleted) {
        return true;
      }
      return false;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
