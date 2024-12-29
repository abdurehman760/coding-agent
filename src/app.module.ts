import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CliModule } from './modules/cli/cli.module';
import { CodeGeneratorModule } from './modules/code-generator/code-generator.module';
import { CommandExecutorModule } from './modules/command-executor/command-executor.module';
import { LangChainChainsModule } from './modules/langchain-chains/langchain-chains.module';
import { FileManagerModule } from './modules/file-manager/file-manager.module';
import { OpenAiModule } from './openai/openai.module';
import { OpenAiService } from './openai/openai.service';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CliModule,
    CodeGeneratorModule,
    CommandExecutorModule,
    LangChainChainsModule,
    FileManagerModule,
    OpenAiModule,
    TestModule,
  ],
  providers: [OpenAiService],
})
export class AppModule {}
