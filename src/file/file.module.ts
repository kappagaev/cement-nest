import { Module } from '@nestjs/common'
import { FileService } from './file.service'

@Module({
  providers: [
    FileService,
    {
      provide: 'UPLOAD_PATH',
      useValue: process.cwd() + '/uploads',
    },
  ],
  exports: [FileService],
})
export class FileModule {}
