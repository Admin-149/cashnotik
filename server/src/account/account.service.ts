import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) { }

    findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    findOne(id: string): Promise<Account> {
        return this.accountRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.accountRepository.delete(id);
    }
}
