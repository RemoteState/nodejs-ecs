import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, name: 'first_name' })
    firstName: string;

    @Column({ nullable: false, name: 'last_name' })
    lastName: string;

    @Column({ nullable: false, name: 'email' })
    @Index({ unique: true, where: 'archived_at IS NULL' })
    email: string;

    @Column({ nullable: false, name: 'phone' })
    @Index({ unique: true, where: 'archived_at IS NULL' })
    phone: string;

    @Column({ nullable: false, name: 'gender' })
    gender: Gender;

    @Column({ nullable: false, name: 'password' })
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'archived_at' })
    archivedAt: Date;
}
