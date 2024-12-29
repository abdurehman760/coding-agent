import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';

@Module({
  providers: [FileManagerService],
  exports: [FileManagerService] // Export the service
})
export class FileManagerModule {}
