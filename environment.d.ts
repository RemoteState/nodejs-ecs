// tslint:disable-next-line:no-namespace
declare namespace NodeJS {
    // tslint:disable-next-line:interface-name
    export interface ProcessEnv {
        PORT: string;
        DB_HOST: string;
        DB_PORT: string;
        DB_USER: string;
        DB_PASS: string;
        DB_NAME: string;
    }
}
