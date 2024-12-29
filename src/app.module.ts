import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAiService } from './openai/openai.service';
import { TestModule } from './test/test.module';
import { LangchainAgentModule } from './modules/langchain-agent/langchain-agent.module';

@Module({
  imports: [ConfigModule.forRoot(), TestModule, LangchainAgentModule],
  providers: [OpenAiService],
})
export class AppModule {}
