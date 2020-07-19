import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './users.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ username });
  }

  async create(@Body() userData: CreateUserDto) {
    const { username, password } = userData;
    const existUser = await this.userRepository.findOne({ username });
    if (existUser) throw new ConflictException('User with such username exist');

    const user = new UserEntity();
    user.username = username;
    user.password = await argon2.hash(password);
    return await this.userRepository.save(user);
  }
}
