import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    providers: [AccountService],
    controllers: [],
})
export class AccountModule { }
