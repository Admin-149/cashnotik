import { UserEntity } from '../users.entity';

export type SafeUserDataDto = Omit<UserEntity, 'password'>;
