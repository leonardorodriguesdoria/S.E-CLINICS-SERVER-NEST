import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entity/paciente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestError, NotFoundError } from 'src/helpers/api-error';
import { hashPassword } from 'src/helpers/hashPassword';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPaciente: CreatePatientDto) {
    try {
      const { nome, email, senha } = createPaciente;
      if (!nome || !email || !senha) {
        throw new BadRequestError('Todos os campos são obrigatórios!!!');
      }
      const patientAlreadyExists = await this.pacienteRepository.findOne({
        where: { email: email },
      });
      if (patientAlreadyExists) {
        throw new BadRequestError(
          'Já existe um usuário com esse e-mail. Por favor, informe outro e-mail',
        );
      }

      const hashedPassword = await hashPassword(senha);

      const newPatient = this.pacienteRepository.create({
        nome,
        email,
        senha: hashedPassword,
      });

      return this.pacienteRepository.save(newPatient);
    } catch (error) {
      throw new Error(`Ocorreu um erro: ${error}`);
    }
  }

  findAll() {
    return `This action returns all paciente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paciente`;
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return `This action updates a #${id} paciente`;
  }

  remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
