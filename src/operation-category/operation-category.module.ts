import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationCategory } from './operation-category.entity';
import { OperationCategoryService } from './operation-category.service';

@Module({
    imports: [TypeOrmModule.forFeature([OperationCategory])],
    providers: [OperationCategoryService],
    controllers: [],
})

export class OperationCategoryModule { }
