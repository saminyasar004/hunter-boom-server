import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import AgentGroup, { AgentGroupProps } from "@/model/agent-group.model";
import { CreateAgentGroupDto } from "./dto/create-aget-group.dto";

/**
 * Service for managing agent groups in the database.
 */
@Injectable()
export class AgentGroupService {
  constructor(
    @InjectModel(AgentGroup)
    private readonly agentGroupModel: typeof AgentGroup,
  ) {}

  /**
   * Creates a new agent group in the database.
   * @param createAgentGroupDto - The data transfer object containing agent group details.
   * @returns The created agent group as a plain object, or null if creation fails.
   * @throws InternalServerErrorException if an error occurs during creation.
   */
  async createAgentGroup(
    createAgentGroupDto: CreateAgentGroupDto,
  ): Promise<AgentGroupProps | null> {
    try {
      const agentGroup = await this.agentGroupModel.create(createAgentGroupDto);
      return agentGroup ? agentGroup.toJSON() : null;
    } catch (err: any) {
      console.error("Error creating agent group:", err);
      throw new InternalServerErrorException("Failed to create agent group");
    }
  }

  /**
   * Deletes an agent group by its ID.
   * @param id - The ID of the agent group to delete.
   * @returns True if the agent group was deleted, false otherwise.
   * @throws InternalServerErrorException if an error occurs during deletion.
   */
  async deleteAgentGroup(agentGroupId: number): Promise<boolean> {
    try {
      const isDeleted = await this.agentGroupModel.destroy({
        where: { agentGroupId },
      });
      return isDeleted > 0;
    } catch (err: any) {
      console.error("Error deleting agent group:", err);
      throw new InternalServerErrorException("Failed to delete agent group");
    }
  }
}
