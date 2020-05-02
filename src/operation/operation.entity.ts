import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';
import { Account } from '../account/account.entity';

@Entity()
export class Operation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: boolean;

    @Column('decimal')
    amount: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(type => Category, category => category.operations)
    category: Category;

    @ManyToOne(type => Account, account => account.operations)
    account: Account;
}
