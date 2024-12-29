import { Module } from '@nestjs/common';
import { LangChainChainsService } from './langchain-chains.service';
import { FileManagerModule } from '../file-manager/file-manager.module';
import { OpenAiModule } from '../../openai/openai.module';
import { LangChainAgentService } from './langchain-agent.service';
import { CodeGeneratorModule } from '../code-generator/code-generator.module';

@Module({
  imports: [FileManagerModule, OpenAiModule, CodeGeneratorModule],
  providers: [LangChainChainsService, LangChainAgentService],
  exports: [LangChainChainsService, LangChainAgentService],
})
export class LangChainChainsModule {}
