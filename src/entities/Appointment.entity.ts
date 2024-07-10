import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './Users.entity';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ManyToOne(() => User, (doctor) => doctor.appointments)
  doctor: User;

  //Adicional
  @Column({ nullable: true })
  notes: string;
}
