import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@UseGuards(JwtStrategy)
@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Get all accounts' })
  @ApiOkResponse({ description: 'Return all accounts' })
  @Get()
  async findAll() {
    return await this.accountService.findAll();
  }

  @ApiOperation({ summary: 'Get account' })
  @ApiOkResponse({ description: 'Return account' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.accountService.findOne(id);
  }

  @ApiOperation({ summary: 'Create account' })
  @ApiCreatedResponse({ description: 'The account has been created' })
  @Post()
  async create(@Body() accountData: CreateAccountDto) {
    return this.accountService.create(accountData);
  }

  @ApiOperation({ summary: 'Update account' })
  @ApiCreatedResponse({ description: 'The article has been updated' })
  @ApiParam({ name: 'id', type: Number })
  @Put(':id')
  async update(@Param('id') id, @Body() accountData: UpdateAccountDto) {
    return this.accountService.update(id, accountData);
  }

  @ApiOperation({ summary: 'Delete account' })
  @ApiCreatedResponse({ description: 'The article has been deleted' })
  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async remove(@Param('id') id) {
    return this.accountService.remove(id);
  }
}
