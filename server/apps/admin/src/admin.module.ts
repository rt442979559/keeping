import { DbModule } from './../../../libs/db/src/db.module';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodeModule } from './episode/episode.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest:'uploads'
    }),
    DbModule, UsersModule, CoursesModule, EpisodeModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
