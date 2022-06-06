/* eslint-disable prettier/prettier */
import { Episode } from '@libs/db/models/episodes.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Episode,
})
@Controller('episode')
@ApiTags('课时')
export class EpisodeController {
  constructor(@InjectModel(Episode) private readonly model) {}
  @Get('option')
  option() {
    return {
      title: '课时管理',
      rowKey: '_id',
      column: [
        {
          label: '课时名称',
          prop: 'name',
          sortable: true,
          search: true,
          row: true,
        },
        {
          label: '封面图',
          prop: 'cover',
          width: 120,
          row: true,
          type: 'upload',
          listType: 'picture-img',
          action: 'http://localhost:3000/upload/',
          // dataType: "string",
          // propsHttp: {
          //   "res": 'data',        // 解析上传完成返回的responseJSON中的字段
          //   "url": "path",     // 解析responseJSON中的data.fileUrl为图片路径
          //   "fileName": "file"  // 指定上传的文件参数为attach,默认使用file接收文件
          // }
        },
      ],
    };
  }
}
