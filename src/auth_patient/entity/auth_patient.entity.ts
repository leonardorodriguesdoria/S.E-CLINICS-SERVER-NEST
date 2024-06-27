import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('autenticação_paciente')
export class AuthPatient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;
}
