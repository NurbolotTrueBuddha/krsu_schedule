import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'group' })
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  group_name: string;
}
