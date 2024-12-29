import { Module } from '@nestjs/common';
import { CodeGeneratorService } from './code-generator.service';
import { FileManagerModule } from '../file-manager/file-manager.module';
import { OpenAiModule } from '../../openai/openai.module';

@Module({
  imports: [FileManagerModule, OpenAiModule],
  providers: [CodeGeneratorService],
  exports: [CodeGeneratorService],
})
export class CodeGeneratorModule {}
