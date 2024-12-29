// relative path: src/modules/langchain-chains/langchain-chains.module.ts

import { Module } from '@nestjs/common';
import { LangChainChainsService } from './langchain-chains.service';
import { FileManagerService } from '../file-manager/file-manager.service';
import { OpenAiService } from '../../openai/openai.service';

@Module({
  providers: [LangChainChainsService, FileManagerService, OpenAiService],
  exports: [LangChainChainsService],
})
export class LangChainChainsModule {}
