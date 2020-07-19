import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OperationService } from './operation.service';
import {
  CreateOperationInput,
  Operation,
  UpdateAccountInput,
} from '../graphql';

@Resolver()
export class OperationResolver {
  constructor(private readonly operationService: OperationService) {}

  @Query('operations')
  async getOperations(): Promise<Operation[]> {
    return this.operationService.findAll();
  }

  @Query('operation')
  async getOperation(@Args('id') id: number): Promise<Operation> {
    return this.operationService.findOne(id);
  }

  @Mutation('createOperation')
  async createOperation(@Args('input') input: CreateOperationInput) {
    return this.operationService.create(input);
  }

  @Mutation('deleteOperation')
  async deleteAccount(@Args('id') id: number) {
    return await this.operationService.delete(id);
  }

  @Mutation('updateAccount')
  async updateAccount(@Args('input') input: UpdateAccountInput) {
    return await this.operationService.update(input);
  }
}
