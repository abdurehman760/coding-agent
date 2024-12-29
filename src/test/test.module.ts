import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { CodeGeneratorModule } from '../modules/code-generator/code-generator.module';
import { LangChainChainsModule } from '../modules/langchain-chains/langchain-chains.module';
import { FileManagerModule } from '../modules/file-manager/file-manager.module';
import { OpenAiService } from '../openai/openai.service';

@Module({
  imports: [CodeGeneratorModule, LangChainChainsModule, FileManagerModule], 
  controllers: [TestController],
  providers: [OpenAiService],
})
export class TestModule {}
