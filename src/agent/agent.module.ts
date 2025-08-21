import { Module } from "@nestjs/common";
import { AgentService } from "./agent.service";
import { AgentController } from "./agent.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Agent from "@/model/agent.model";

@Module({
  imports: [SequelizeModule.forFeature([Agent])],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
