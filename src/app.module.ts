import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthPatientModule } from './auth_patient/auth_patient.module';
import { AuthPatient } from './auth_patient/entity/auth_patient.entity';
import { DataSource } from 'typeorm';

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
      entities: [AuthPatient],
      migrations: ['dist/db/migrations/*.js'],
      synchronize: process.env.ENV === 'development',
    } as TypeOrmModuleOptions),
    AuthPatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
