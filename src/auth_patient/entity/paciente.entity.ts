import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('autenticação_paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  nome: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  senha: string;
}
