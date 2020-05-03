import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { OperationService } from './operation.service';

@ApiTags('operations')
@Controller('operations')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @ApiOperation({ summary: 'Get all operations' })
  @ApiOkResponse({ description: 'Return all operations' })
  @Get()
  async findAll() {
    return this.operationService.findAll();
  }

  @ApiOperation({ summary: 'Get operation' })
  @ApiOkResponse({ description: 'Return operation' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async findOne(@Param('id') id) {
    return this.operationService.findOne(id);
  }

  @ApiOperation({ summary: 'Create operation' })
  @ApiCreatedResponse({ description: 'The operation has been created ' })
  @Post()
  async create(@Body() operationData: CreateOperationDto) {
    return this.operationService.create(operationData);
  }

  @ApiOperation({ summary: 'Update operation' })
  @ApiCreatedResponse({ description: 'The operation has been updated' })
  @ApiParam({ name: 'id', type: Number })
  @Put(':id')
  async update(@Param('id') id, @Body() operationData: UpdateOperationDto) {
    return this.operationService.update(id, operationData);
  }

  @ApiOperation({ summary: 'Delete operation' })
  @ApiCreatedResponse({ description: 'The operation has been deleted' })
  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async remove(@Param('id') id) {
    return this.operationService.remove(id);
  }
}
