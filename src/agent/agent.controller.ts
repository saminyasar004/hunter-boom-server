import { Controller } from "@nestjs/common";
import { AgentService } from "./agent.service";

@Controller("api/agent")
export class AgentController {
  constructor(private readonly agentService: AgentService) {}
}
