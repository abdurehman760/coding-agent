import { Module } from '@nestjs/common';
import { LangchainAgentService } from './langchain-agent/langchain-agent.service';

@Module({
  providers: [LangchainAgentService]
})
export class LangchainAgentModule {}
