import { MigrationInterface, QueryRunner } from 'typeorm';

/* tslint:disable:class-name */
export class users1627292360258 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
        await queryRunner.query(`CREATE TYPE gender AS ENUM (
                                            'male',
                                            'female',
                                            'other'
                                        );`);
        await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS users (
                   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                   first_name TEXT NOT NULL,
                   last_name TEXT,
                   email TEXT NOT NULL,
                   password TEXT NOT NULL,
                   gender gender NOT NULL,
                   phone TEXT,
                   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                   archived_at TIMESTAMP WITH TIME ZONE
                );
        `);
    }

    /* tslint:disable:no-empty */
    public async down(queryRunner: QueryRunner): Promise<void> {}
}
