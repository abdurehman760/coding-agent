import { Module } from '@nestjs/common'; 
import { CodeGeneratorService } from './code-generator.service';
import { FileManagerModule } from '../file-manager/file-manager.module';
import { OpenAiService } from '../../openai/openai.service';

@Module({
  imports: [FileManagerModule],
  providers: [CodeGeneratorService, OpenAiService],
  exports: [CodeGeneratorService], // Add this line to export CodeGeneratorService
})
export class CodeGeneratorModule {}
