import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CliService } from './modules/cli/cli.service';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.createApplicationContext(AppModule);
  const cliService = app.get(CliService);
  await cliService.run(process.argv);
}

bootstrap();


