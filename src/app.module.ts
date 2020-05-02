import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationCategoryModule } from './operation-category/operation-category.module';
import { OperationModule } from './operation/operation.module';

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
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client/build'),
            exclude: ['/api*'],
        }),
        AccountModule,
        OperationCategoryModule,
        OperationModule,
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
