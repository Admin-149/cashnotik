import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account, CreateAccountInput, UpdateAccountInput } from '../graphql';

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query('accounts')
  async getAccounts(): Promise<Account[]> {
    return await this.accountService.findAll();
  }

  @Query('account')
  async getAccount(@Args('id') id): Promise<Account> {
    return await this.accountService.findOne(id);
  }

  @Mutation('createAccount')
  async createAccount(@Args('input') input: CreateAccountInput) {
    return await this.accountService.create(input);
  }

  @Mutation('deleteAccount')
  async deleteAccount(@Args('id') id: number) {
    return await this.accountService.delete(id);
  }

  @Mutation('updateAccount')
  async updateAccount(@Args('input') input: UpdateAccountInput) {
    return await this.accountService.update(input);
  }
}
