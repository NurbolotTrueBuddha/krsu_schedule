import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group, Lesson, Student, Subject } from './pg';
import { GroupKey } from './enum';

@Injectable()
export class TelegramService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lesson: Repository<Lesson>,
    @InjectRepository(Group)
    private readonly group: Repository<Group>,
    @InjectRepository(Student)
    private readonly student: Repository<Student>,
  ) {}

  async login(msg) {
    const text = msg.text.split(' ');
    if (text[3] == GroupKey.EPI_2_21 && text.length == 4) {
      const groupInfo = await this.group.findOne({
        where: { group_name: 'ЕПИ-2-21' },
      });
      const user = new Student();
      user.full_name = `${text[1]} ${text[2]}`;
      user.group_id = groupInfo.id;
      user.telegram_id = msg.from.id;

      this.student.save(user);
      return 'Вы успешно зарегестрировались'
    }
    if (text[3] == GroupKey.EPI_3_21 && text.length == 4) {
      console.log(text[3]);
      const groupInfo = await this.group.findOne({
        where: { group_name: 'ЕПИ-3-21' },
      });
      const user = new Student();
      user.full_name = `${text[1]} ${text[2]}`;
      user.group_id = groupInfo.id;
      user.telegram_id = msg.from.id;

      this.student.save(user);
      return 'Вы успешно зарегестрировались'
    }
    return 'Некорректные данные'
  }

  async getGroupId(id) {
    return this.student.findOne({ where: { telegram_id: id } });
  }

  async getTodayLessons(msg) {
    const info = await this.getGroupId(msg.from.id);
    console.log(info, ' информация о студенте запросившего расписание');
    const result = await this.lesson
      .createQueryBuilder('lesson')
      .innerJoinAndMapOne(
        'lesson.subject',
        Subject,
        'subject',
        'lesson.subject_id = subject.id',
      )
      .select([
        'lesson.id',
        'lesson.date',
        'lesson.start_time',
        'lesson.end_time',
        'lesson.day_of_week',
        'subject.id',
        'subject.name',
        'subject.teacher',
        'subject.type',
        'subject.classroom',
      ])
      .where('group_id = :groupId', { groupId: info.group_id })
      .andWhere(
        'EXTRACT(DOW FROM lesson.date) = EXTRACT(DOW FROM CURRENT_DATE)',
      )
      .orderBy('lesson.start_time', 'ASC')
      .getRawMany();

    let messages = '';
    if (result.length > 0) {
      result.forEach((item) => {
        item.lesson_end_time = item.lesson_end_time.slice(0, -3);
        item.lesson_start_time = item.lesson_start_time.slice(0, -3);
        const message = `
Предмет: ${item.subject_name}
Тип занятий: ${item.subject_type}
Преподаватель: ${item.subject_teacher}
Кабинет: ${item.subject_classroom}
Время: ${item.lesson_start_time} - ${item.lesson_end_time}
`;
        messages += message;
      });
      return messages;
    }

    return 'На сегодня расписаний нет';
  }
}
