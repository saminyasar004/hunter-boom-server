import { Module } from '@nestjs/common';
import { AgentGroupService } from './agent-group.service';
import { AgentGroupController } from './agent-group.controller';

@Module({
  controllers: [AgentGroupController],
  providers: [AgentGroupService],
})
export class AgentGroupModule {}
