import { ConflictException, Injectable } from '@nestjs/common';
import { AuthPatientRegisterDto } from '../dto/auth-patient-register';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { hashPassword } from 'src/helpers/hashPassword';
import { AuthPatient } from '../entity/auth_patient.entity';

@Injectable()
export class AuthPatientService {
  constructor(
    @InjectRepository(AuthPatient)
    private readonly patientRepository: Repository<AuthPatient>,
  ) {}

  //Função para cadastro de cliente
  async register(registerPatient: AuthPatientRegisterDto) {
    const { name, email, password } = registerPatient;

    const patientAlreadyExists = await this.patientRepository.findOne({
      where: { email: email },
    });
    if (patientAlreadyExists) {
      throw new ConflictException(
        'Já existe um usuário com esse e-mail. Por favor, informe outro endereço de e-mail',
      );
    }

    const hashedPassword = await hashPassword(password);

    const newPatient = this.patientRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.patientRepository.save(newPatient);
  }
}
