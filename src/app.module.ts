import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PacienteModule } from './auth_patient/paciente.module';
import { Paciente } from './auth_patient/entity/paciente.entity';

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
      entities: [Paciente],
      migrations: ['dist/db/migrations/*.js'],
      synchronize: process.env.ENV === 'development',
    }),
    PacienteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
