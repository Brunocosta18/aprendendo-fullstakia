// Importa a função principal do Drizzle para drivers de Node.js (PostgreSQL)
import { drizzle } from 'drizzle-orm/node-postgres'

// Importa as variáveis de ambiente validadas (como a DATABASE_URL)
import { env } from '@/env.js'

// Importa todas as definições de tabelas (schema) para que o Drizzle as conheça
import * as schema from './schema.js'

/**
 * Cria e exporta a instância de conexão com o banco de dados.
 * * env.DATABASE_URL: A string de conexão (ex: postgresql://docker:docker@localhost:5432/webhooks)
 * schema: Passamos o schema aqui para termos o "Autocompletar" (IntelliSense) das tabelas ao usar o 'db'
 * casing: Configura o Drizzle para converter automaticamente camelCase (código) para snake_case (banco)
 */
export const db = drizzle(env.DATABASE_URL, {
    schema,
    casing: 'snake_case',
})