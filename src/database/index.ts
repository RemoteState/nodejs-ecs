import { Connection, createConnection } from 'typeorm';
// import * as ormConfig from '../../ormconfig';

export class Database {
    public static instance: Database;
    private conn: Connection | null;

    private constructor() {
        this.conn = null;
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connectAndMigrate(logging: boolean) {
        this.conn = await createConnection();
        await this.conn.runMigrations({
            transaction: 'all',
        });
    }

    public async close() {
        if (this.conn) {
            await this.conn.close();
            this.conn = null;
        }
    }
}
