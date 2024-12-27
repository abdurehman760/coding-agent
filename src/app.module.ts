import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAiService } from './openai/openai.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [OpenAiService],
})
export class AppModule {}
