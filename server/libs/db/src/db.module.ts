import { Episode } from './models/episodes.model';
import { Course } from './models/course.model';
import { User } from './models/user.model';
import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'


const models = TypegooseModule.forFeature([User,Course,Episode])
@Global()
@Module({
  imports:[
    TypegooseModule.forRoot('mongodb://localhost/admindb'),
    models,
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule {}
