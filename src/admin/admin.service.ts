import { Injectable } from '@nestjs/common';
import { LessonDTO } from './dto/lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group, Lesson, Subject } from 'src/telegram/pg';
import { Repository } from 'typeorm';
import { SubjectDTO } from './dto/subject.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lesson: Repository<Lesson>,
    @InjectRepository(Group)
    private readonly group: Repository<Group>,
    @InjectRepository(Subject)
    private readonly subject: Repository<Subject>
  ) {}

  async addLesson(lesson: LessonDTO){

    const newLesson = new Lesson()
    const groupData = await this.group.findOne({where:{group_name: lesson.groupName}})

    newLesson.group_id = groupData.id

    newLesson.date = lesson.date,
    newLesson.day_of_week = lesson.dayOfWeek,
    newLesson.end_time = new Date(lesson.endTime),
    newLesson.start_time = new Date(lesson.startTime),
    newLesson.subject_id = lesson.subjectId

    return this.lesson.save(newLesson)
  }

  async addSubject(sub: SubjectDTO){
    const newSub = new Subject()
    newSub.classroom = sub.classRoom
    newSub.name = sub.name
    newSub.teacher = sub.teacher
    newSub.type = sub.type

    return this.subject.save(newSub)
  }
}
