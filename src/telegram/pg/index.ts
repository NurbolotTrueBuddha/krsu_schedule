import { Group } from './group.entity';
import { Lesson } from './lesson.entity';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

export const ENTITY = [Lesson, Subject, Student, Group];

export * from './group.entity';
export * from './subject.entity';
export * from './student.entity';
export * from './lesson.entity';