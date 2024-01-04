import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'subject' })
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  teacher: string;

  @Column()
  type: string;

  @Column()
  classroom: number;
}
