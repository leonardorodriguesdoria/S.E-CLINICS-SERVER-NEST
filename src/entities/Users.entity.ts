import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from './Appointment.entity';
import { Review } from './Reviews.entity';
import { Notification } from './Notifications.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column()
  dateBirth: Date;

  @Column()
  isDoctor: boolean;

  //Campos para médicos
  @Column({ nullable: true })
  specialty: string;

  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
