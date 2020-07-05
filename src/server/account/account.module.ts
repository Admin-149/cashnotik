import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  exports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService, AccountResolver],
})
export class AccountModule {}
