import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { SwaggerModule , DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);
  app.enableCors()
  app.useStaticAssets('uploads',{
    prefix:'/uploads'
  })

  const options = new DocumentBuilder()
  .setTitle('后台管理API')
  .setDescription('description')
  .setVersion('1.0')
  .addTag('cats')
  .build()
  const document = SwaggerModule.createDocument(app,options)
  SwaggerModule.setup('api-docs',app,document)
  await app.listen(3000);

  console.log('http://localhost:3000/api-docs')
}
bootstrap();
