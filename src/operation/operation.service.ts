import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/account.entity';
import { Category } from '../category/category.entity';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './operation.entity';

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
  ) {}

  async findAll(): Promise<Operation[]> {
    return this.operationRepository.find({relations: ['category', 'account']});
  }

  async findOne(id: number): Promise<Operation> {
      return this.operationRepository.findOne(id);
  }

  async create(@Body() operationData: CreateOperationDto): Promise<Operation> {
    const account = await this.accountRepository.findOne({id: operationData.accountId});
    const category = await this.categoryRepository.findOne({id: operationData.categoryId});
    if (!account) { throw new ConflictException('Account with this id is not exist'); }
    if (!category) { throw new ConflictException('Category with this id is not exist'); }

    const operation = new Operation();
    operation.account = account;
    operation.category = category;
    operation.amount = operationData.amount;
    operation.date = operationData.date;

    account.amount = Math.floor((+account.amount + +operation.amount) * 100) / 100;
    await this.accountRepository.save(account);
    await this.operationRepository.save(operation);
    return operation;
  }

  async update(id: number, @Body() operationData: UpdateOperationDto): Promise<void> {
    const operationToUpdate = await this.operationRepository.findOne(id, {relations: ['account']});
    let oldAccount: Account;
    let newAccount: Account;
    if (!operationToUpdate) { throw new ConflictException('Operation with this id is not exist'); }

    if (operationData.accountId && operationData.accountId !== operationToUpdate.account.id) {
      oldAccount = await this.accountRepository.findOne(operationToUpdate.account.id);
      newAccount = await this.accountRepository.findOne(operationData.accountId);
      if (!newAccount) { throw new ConflictException('Account with provided id is not exist'); }
      oldAccount.amount = Math.floor((+oldAccount.amount - +operationToUpdate.amount) * 100) / 100;
      newAccount.amount = Math.floor((+newAccount.amount + +operationToUpdate.amount) * 100) / 100;
    }

    if (operationData.amount !== undefined) {
      if (!newAccount) {
        newAccount = await this.accountRepository.findOne(operationToUpdate.account.id);
      }
      newAccount.amount = Math.floor((+newAccount.amount - +operationToUpdate.amount + +operationData.amount) * 100) / 100;
    }

    if (oldAccount) {
      await this.accountRepository.save(oldAccount);
    }
    if (newAccount) {
      await this.accountRepository.save(newAccount);
    }

    const updatedOperation = Object.assign(operationToUpdate, operationData);
    await this.operationRepository.save(updatedOperation);
  }

  async remove(id: number): Promise<void> {
    const operation = await this.operationRepository.findOne(id, {relations: ['account']});
    if (!operation) { throw new ConflictException('Operation with this id is not exist'); }
    const account = await this.accountRepository.findOne({id: operation.account.id});
    account.amount = Math.floor((+account.amount - +operation.amount) * 100) / 100;
    await this.accountRepository.save(account);
    await this.operationRepository.delete(id);
  }
}
