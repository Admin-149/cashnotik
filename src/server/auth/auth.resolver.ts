import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from '../graphql';
import { UsersService } from '../users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation('login')
  async login(@Args('input') input: AuthInput) {
    const user = await this.authService.validateUser(
      input.username,
      input.password,
    );
    return this.authService.login({ id: user.id, username: user.username });
  }

  @Mutation('register')
  async register(@Args('input') input: AuthInput) {
    const user = await this.usersService.create(input);
    return this.authService.login({ id: user.id, username: user.username });
  }
}
