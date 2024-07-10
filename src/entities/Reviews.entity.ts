import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './Users.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @Column()
  date: Date;

  //Patient
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => User, (doctor) => doctor.reviews)
  doctor: User;
}
