import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  async create(@Body() userData: CreateUserDto): Promise<User> {
    const { username, password } = userData;
    const existUser = await this.userRepository.findOne({ username });
    if (existUser) throw new ConflictException('User with such username exist');

    const user = new User();
    user.username = username;
    user.password = await argon2.hash(password);
    return await this.userRepository.save(user);
  }
}
