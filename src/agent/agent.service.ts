import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateAgentDto } from "./dto/create-agent.dto";
import Agent, { AgentCreationProps } from "@/model/agent.model";
import { InjectModel } from "@nestjs/sequelize";
import { hashedPassword } from "@/lib";
import { UpdateAgentDto } from "./dto/update-agent.dto";

@Injectable()
export class AgentService {
  constructor(
    @InjectModel(Agent)
    private readonly agentModel: typeof Agent,
  ) {}

  async getAllAgents() {
    try {
      const agents = await this.agentModel.findAll();
      return agents;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAgentById(
    agentId: number,
  ): Promise<Agent | AgentCreationProps | null> {
    try {
      const agent = await this.agentModel.findOne({
        where: {
          agentId,
        },
      });

      if (agent) {
        return agent.toJSON();
      }
      return null;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async createAgent(
    createAgentDto: CreateAgentDto,
    file?: string,
  ): Promise<Agent | AgentCreationProps | null> {
    try {
      const agent = await this.agentModel.create({
        ...createAgentDto,
        password: await hashedPassword(createAgentDto.password),
        isDeleted: false,
        isTopLevel: 1,
        uplineAgentId: null,
        file,
      });

      if (agent) {
        return agent.toJSON();
      }
      return null;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async editAgent(
    agentId: number,
    updateAgentDto: UpdateAgentDto,
    file?: string,
  ): Promise<Agent | AgentCreationProps | null> {
    try {
      const agent = await this.agentModel.findOne({
        where: {
          agentId,
        },
      });

      const updatedAgent = await this.agentModel.update(
        {
          ...updateAgentDto,
          file,
        },
        {
          where: {
            agentId,
          },
        },
      );

      if (agent && updateAgentDto.password) {
        agent.password = await hashedPassword(updateAgentDto.password);
      }

      if (updatedAgent) {
        return this.findAgentById(agentId);
      }
      return null;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteAgent(agentId: number): Promise<boolean> {
    try {
      const deletedAgent = await this.agentModel.destroy({
        where: {
          agentId,
        },
      });

      if (deletedAgent) {
        return true;
      }
      return false;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
