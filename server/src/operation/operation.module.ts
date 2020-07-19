import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { CategoryModule } from '../category/category.module';
import { OperationService } from './operation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operation.entity';
import { OperationResolver } from './operation.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    CategoryModule,
    AccountModule,
  ],
  providers: [OperationResolver, OperationService],
})
export class OperationModule {}
