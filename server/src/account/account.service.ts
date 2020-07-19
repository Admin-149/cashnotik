import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountInput, UpdateAccountInput } from '../graphql';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(id: number): Promise<Account> {
    return this.accountRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.accountRepository.delete(id);
  }

  async create(input: CreateAccountInput): Promise<Account> {
    const existAccount = await this.accountRepository.findOne({
      title: input.title,
    });
    if (existAccount) {
      throw new HttpException(
        'Account with same title already exist',
        HttpStatus.CONFLICT,
      );
    }

    const account = new Account();
    account.title = input.title;
    account.amount = input.amount;

    await this.accountRepository.save(account);
    return account;
  }

  async update(input: UpdateAccountInput): Promise<Account> {
    const { id, ...accountData } = input;
    const accountToUpdate = await this.accountRepository.findOne({ id });
    const updatedAccount = Object.assign(accountToUpdate, accountData);
    await this.accountRepository.save(updatedAccount);
    return updatedAccount;
  }
}
