import { Episode } from '@libs/db/models/episodes.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model:Episode
})
@Controller('episode')
@ApiTags('课时')
export class EpisodeController {
  constructor(@InjectModel(Episode) private readonly model){}
}
