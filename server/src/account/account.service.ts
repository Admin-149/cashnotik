import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) { }

    async findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    async findOne(id: string): Promise<Account> {
        return this.accountRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.accountRepository.delete(id);
    }

    async create(@Body('account') accountData: CreateAccountDto): Promise<Account> {
        const existAccount = await this.accountRepository.findOne({ title: accountData.title });
        if (existAccount) {
            throw new HttpException('Account with same title already exist', HttpStatus.CONFLICT);
        }

        const account = new Account();
        account.title = accountData.title;
        account.amount = accountData.amount;

        await this.accountRepository.save(account);
        return account;
    }

    async update(id: number, @Body('account') accountData: UpdateAccountDto): Promise<Account> {
        const accountToUpdate = await this.accountRepository.findOne({id});
        const updatedAccount = Object.assign(accountToUpdate, accountData);
        await this.accountRepository.save(updatedAccount);
        return updatedAccount;
    }
}
