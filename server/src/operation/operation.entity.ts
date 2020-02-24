import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { OperationCategory } from '../operation-category/operation-category.entity';
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

    @ManyToOne(type => OperationCategory, operationCategory => operationCategory.operations)
    operationCategory: OperationCategory;

    @ManyToOne(type => Account, account => account.operations)
    account: Account;
}
