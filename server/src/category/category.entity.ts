import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Operation } from '../operation/operation.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icon: string;

  @Column({
    unique: true,
  })
  title: string;

  @OneToMany(() => Operation, (operation) => operation.category)
  operations: Operation[];
}
