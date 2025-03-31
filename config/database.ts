import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST', '127.0.0.1'),
        port: parseInt(env.get('DB_PORT', '5432')),        
        user: env.get('DB_USER', 'user'),
        password: env.get('DB_PASSWORD', 'Hack2025'),
        database: env.get('DB_DATABASE', 'tweeter_clone_with_adonis'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
