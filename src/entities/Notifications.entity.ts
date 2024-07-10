import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './Users.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  date: Date;

  @Column()
  read: boolean;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
