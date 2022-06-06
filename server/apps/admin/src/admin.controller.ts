/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getHello(): string {
    return this.adminService.getHello();
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file){
    // return {
    //   url : `http://localhost:3000/uploads/${file.filename}`
    // }
    return file
  }
}
