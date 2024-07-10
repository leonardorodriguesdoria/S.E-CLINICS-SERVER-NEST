import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthUserModule } from './auth_user/auth_user.module';
import { DataSource } from 'typeorm';
import { User } from './entities/Users.entity';
import { Appointment } from './entities/Appointment.entity';
import { Review } from './entities/Reviews.entity';
import { Notification } from './entities/Notifications.entity';

const databasePort = process.env.DB_PORT as unknown as number | undefined;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: databasePort,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Notification, Review, Appointment],
      migrations: ['dist/db/migrations/*.js'],
      synchronize: process.env.ENV === 'development',
    } as TypeOrmModuleOptions),
    AuthUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
