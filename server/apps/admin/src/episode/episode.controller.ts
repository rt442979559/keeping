import { Episode } from '@libs/db/models/episodes.model';
import { Controller, Get } from '@nestjs/common';
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
  @Get('option')
  option(){
    return {
      title:'课时管理',
      rowKey:'_id',
      column:[
        { label:'课时名称' , prop:'name' , sortable:true , search: true ,row: true }, 
        { label:'封面图' , prop:'url' , width: 120, type:'upload' ,row: true , listType :'picture-img', action:'http://localhost:3000/upload' , 
          props: {
            label:'111',
            url:'url'
          }
        }
      ]
    }
  }
}
