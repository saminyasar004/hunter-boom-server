import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateAgentDto } from "./dto/create-agent.dto";
import Agent, { AgentCreationProps } from "@/model/agent.model";
import { InjectModel } from "@nestjs/sequelize";
import { hashedPassword } from "@/lib";

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

  async createAgent(
    createAgentDto: CreateAgentDto,
    file?: string,
  ): Promise<Agent | AgentCreationProps | null> {
    try {
      const agent = await this.agentModel.create({
        ...createAgentDto,
        password: await hashedPassword(createAgentDto.password),
        isDeleted: false,
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
}
