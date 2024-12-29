import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { CodeGeneratorModule } from '../code-generator/code-generator.module';
import { CommandExecutorModule } from '../command-executor/command-executor.module';
import { LangChainChainsModule } from '../langchain-chains/langchain-chains.module';
import { FileManagerModule } from '../file-manager/file-manager.module';

@Module({
  imports: [CodeGeneratorModule, CommandExecutorModule, LangChainChainsModule, FileManagerModule],
  providers: [CliService],
  exports: [CliService],
})
export class CliModule {}
