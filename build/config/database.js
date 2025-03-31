import { defineConfig } from '@adonisjs/lucid';
const dbConfig = defineConfig({
    connection: 'postgres',
    connections: {
        postgres: {
            client: 'pg',
            connection: {
                host: process.env.DB_HOST || '',
                port: Number(process.env.DB_PORT) || 5432,
                user: process.env.DB_USER || '',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_DATABASE || '',
            },
            migrations: {
                naturalSort: true,
                paths: ['database/migrations'],
            },
        },
    },
});
export default dbConfig;
//# sourceMappingURL=database.js.map