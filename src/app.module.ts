import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAiService } from './openai/openai.service';
import { TestModule } from './test/test.module';


@Module({
  imports: [ConfigModule.forRoot(), TestModule, ],
  providers: [OpenAiService],
})
export class AppModule {}
