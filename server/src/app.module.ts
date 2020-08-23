import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';
import { OperationModule } from './operation/operation.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RootController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
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
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      typePaths: ['./src/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    AccountModule,
    AuthModule,
    CategoryModule,
    OperationModule,
    UsersModule,
  ],

  controllers: [RootController],
  providers: [],
})
export class AppModule {}
