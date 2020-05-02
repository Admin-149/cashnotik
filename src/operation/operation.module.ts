import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Operation])],
    providers: [OperationService],
    controllers: [],
})
export class OperationModule { }
