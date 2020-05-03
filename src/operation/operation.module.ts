import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { CategoryModule } from '../category/category.module';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    CategoryModule,
    AccountModule,
  ],
  providers: [OperationService],
  controllers: [OperationController],
})
export class OperationModule {}
