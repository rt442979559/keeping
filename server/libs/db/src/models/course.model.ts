import { modelOptions, prop  ,Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Episode } from './episodes.model';

@modelOptions({
	schemaOptions:{
		timestamps: true
	}
})
export class Course { 
	@ApiProperty({ description:'课程名称' })
	@prop() // 只有定义了@prop才能把该属性映射到数据库
	name:string

	@ApiProperty({ description:'封面图' })
	@prop() 
	cover:string

	@ApiProperty({ description:'课时' })
	@prop({ ref:'Episode' })
	episodes:Ref<Episode>[]
}