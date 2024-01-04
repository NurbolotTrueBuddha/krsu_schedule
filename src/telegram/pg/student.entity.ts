import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column()
  group_id: string;

  @Column({ unique: true })
  telegram_id: number;
}
