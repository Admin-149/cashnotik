import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Account } from '../account/account.entity';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(
    () => Category,
    category => category.operations,
    {
      onDelete: 'CASCADE',
    },
  )
  category: Category;

  @ManyToOne(
    () => Account,
    account => account.operations,
    {
      onDelete: 'CASCADE',
    },
  )
  account: Account;
}
