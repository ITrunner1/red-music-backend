import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileService } from './file.service';
import { path } from 'app-root-path';
import { FileController } from './file.controller';

@Module({
  providers: [FileService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: (`${path}/uploads`),
      serveRoot: '/uploads',
    })
  ],
  controllers: [FileController]
})
export class FileModule { }

