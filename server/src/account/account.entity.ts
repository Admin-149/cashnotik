import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Operation } from '../operation/operation.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  title: string;

  @Column('decimal')
  amount: number;

  @OneToMany(type => Operation, operation => operation.account)
  operations: Operation[];
}
