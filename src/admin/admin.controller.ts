import { Body, Controller, Post, Req } from '@nestjs/common';
import { LessonDTO } from './dto/lesson.dto';
import { AdminService } from './admin.service';
import { SubjectDTO } from './dto/subject.dto';

@Controller()
export class AdminController {
  constructor(
    private readonly service: AdminService
  ) {}

  @Post('lesson')
  async addLesson(@Body() dto: LessonDTO){
    return this.service.addLesson(dto)
  }

  @Post('subject')
  async addSubject(@Body() dto: SubjectDTO){
    return this.service.addSubject(dto)
  }
}
