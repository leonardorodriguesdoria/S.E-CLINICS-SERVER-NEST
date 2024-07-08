import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword, comparePassword } from 'src/helpers/hashPassword';
import { AuthPatient } from '../entity/auth_patient.entity';
import { JwtService } from '@nestjs/jwt';
import { IRegisterPatient } from 'src/interfaces/RegisterPatient.interface';
import { ILoginPatient } from 'src/interfaces/LoginPatient.interface';

@Injectable()
export class AuthPatientService {
  private issuer = 'login';
  private audience = 'patients';
  constructor(
    @InjectRepository(AuthPatient)
    private readonly patientRepository: Repository<AuthPatient>,
    private readonly jwtService: JwtService,
  ) {}

  //Função para cadastro de cliente
  async create(registerPatient: IRegisterPatient) {
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

    await this.patientRepository.save(newPatient);
    return { message: 'Usuário cadastrado com Sucesso' };
  }

  async createToken(patient: AuthPatient) {
    return {
      access_token: this.jwtService.sign(
        {
          name: patient.name,
          email: patient.email,
        },
        {
          expiresIn: '3 days',
          subject: String(patient.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  async checkToken(token: string) {
    try {
      const patient = this.jwtService.verify(token, {
        audience: 'patients',
        issuer: 'login',
      });
      return patient;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
    } catch (error) {
      return false;
    }
  }

  async login(body: ILoginPatient) {
    const { email, password } = body;

    const patient = await this.patientRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!patient) {
      throw new UnauthorizedException('Email e/ou senhas inválidos');
    }

    const isPasswordValid = await comparePassword(password, patient.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email e/ou senhas inválidos');
    }

    const token = this.jwtService.sign(
      { id: patient.id, email: patient.email },
      {
        expiresIn: '3 days',
        subject: String(patient.id),
        issuer: this.issuer,
        audience: this.audience,
      },
    );

    return { access_token: token };
  }

  async forget(email: string) {
    const user = await this.patientRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email inválido');
    }

    //Enviar o e-mail de autorização de redefinição de senha
    return true;
  }

  async reset(token: string, password: string) {
    const id = 0;

    const patient = (await this.patientRepository.update(
      { id: id },
      { password: password },
    )) as unknown as AuthPatient;

    return this.createToken(patient);
  }
}
