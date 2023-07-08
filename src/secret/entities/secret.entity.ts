import { IsDate, IsInt, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Secret {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  uri: string;

  @CreateDateColumn()
  @Column({ name: 'created_at' })
  @IsDate()
  createdAt: Date;

  @Column({ name: 'expires_at' })
  @IsDate()
  expiresAt: Date;

  @Column({ name: 'views_allowed' })
  @IsInt()
  @Min(0)
  viewsAllowed: number;

  @Column({ name: 'views_left' })
  @IsInt()
  @Min(0)
  viewsLeft: number;

  @Column()
  passphrase: string;

  @Column({
    type: 'text',
  })
  secret: string;
}
