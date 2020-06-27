import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';
import { OperationModule } from './operation/operation.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RootController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AccountModule,
    CategoryModule,
    OperationModule,
    AuthModule,
    UsersModule,
  ],

  controllers: [RootController],
  providers: [],
})
export class AppModule {}
