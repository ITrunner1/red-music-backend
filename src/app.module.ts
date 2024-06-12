import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './datasource/typeorm.module';
import { FileModule } from './file/file.module';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { SongModule } from './song/song.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule,
    AuthModule,
    UserModule,
    SongModule,
    PlaylistModule,
    FileModule,
    CommentModule,
    PaginationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
