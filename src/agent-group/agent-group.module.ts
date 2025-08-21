import { Module } from "@nestjs/common";
import { AgentGroupService } from "./agent-group.service";
import { AgentGroupController } from "./agent-group.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import AgentGroup from "@/model/agent-group.model";

@Module({
  imports: [SequelizeModule.forFeature([AgentGroup])],
  controllers: [AgentGroupController],
  providers: [AgentGroupService],
})
export class AgentGroupModule {}
