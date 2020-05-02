import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Operation } from '../operation/operation.entity';

@Entity('operation_category')
export class OperationCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => Operation, operation => operation.operationCategory)
    operations: Operation[]
}
