import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';
import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Course
})
@ApiTags('课程')
@Controller('courses')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model){}
}
