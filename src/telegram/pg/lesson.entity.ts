import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lesson' })
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  subject_id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time', precision: 0 })
  start_time: Date;

  @Column({ type: 'time', precision: 0 })
  end_time: Date;

  @Column()
  day_of_week: string;

  @Column()
  group_id: string;
}
