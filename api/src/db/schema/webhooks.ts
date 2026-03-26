import { pgTable, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7';

// Define a estrutura da tabela 'webhooks' no banco de dados PostgreSQL
export const webhooks = pgTable('webhooks', {
  
  // ID único usando UUID v7 (ordenável por tempo, excelente para performance)
  // $defaultFn: Função que gera o ID automaticamente se nenhum for enviado
  id: text().primaryKey().$defaultFn(() => uuidv7()),

  // Armazena o método HTTP (GET, POST, etc.) - .notNull() obriga ter valor
  method: text().notNull(),

  // Armazena a rota/caminho da URL que recebeu o webhook
  pathname: text().notNull(),

  // Armazena o endereço IP de quem enviou a requisição
  ip: text().notNull(),

  // Código de resposta (Ex: 200, 201, 404). Default define 200 como padrão
  // 'status_code' é como o nome aparecerá na coluna do banco de dados
  statusCode: integer('status_code').notNull().default(200),

  // Tipo do conteúdo enviado (Ex: application/json)
  contentType: text('content_type'),

  // Tamanho do corpo da requisição em bytes
  contentLength: integer('content_length'),

  // Armazena os parâmetros da URL (?id=123) em formato JSON
  // .$type define o formato do objeto para o TypeScript (Chave: Valor)
  queryParams: jsonb('query_params').$type<Record<string, string>>(),

  // Armazena os cabeçalhos da requisição (Headers)
  headers: jsonb().$type<Record<string, string>>().notNull(),

  // O conteúdo principal (corpo) do webhook em formato de texto
  body: text(),

  // Data e hora da criação. .defaultNow() preenche com o horário atual do servidor
  createdAt: timestamp('created_at').notNull().defaultNow(),
})