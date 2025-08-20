import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
import { DatabaseQueryError } from "../exception/DatabaseQueryError";
import { TABLES } from "./table";
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

import { INSERT_PESSOAS } from "./mocks/pessoas";
import { INSERT_DOADORES } from "./mocks/doadores";
import { INSERT_USUARIOS } from "./mocks/usuarios";
import {INSERT_LISTAS_DE_DESEJOS} from "./mocks/lista_de_desejos"
/**
 * Executa uma consulta SQL no banco de dados PostgreSQL.
 *
 * @template T - Tipo dos objetos que serão retornados na lista.
 * @param {string} text - A string da query SQL, com placeholders `$1, $2, ...` para parâmetros.
 * @param {unknown[]} [params] - Array opcional de valores para substituir os placeholders na query.
 * @returns {Promise<T[]>} - Uma Promise que resolve para um array de objetos do tipo `T`, correspondentes às linhas retornadas pelo banco.
 *
 * @example
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * // Consulta usuários ativos no banco
 * const activeUsers = await <User>(
 *   "SELECT id, name, email FROM users WHERE active = $1",
 *   [true]
 * );
 *
 */

export async function executeQueryMultipleResults<T>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows as T[];
  } finally {
    client.release();
  }
}

/**
 * Executa uma consulta SQL no banco de dados PostgreSQL e retorna apenas um registro.
 *
 * @template T - Tipo do objeto que será retornado.
 * @param {string} text - A string da query SQL, com placeholders `$1, $2, ...` para parâmetros.
 * @param {unknown[]} [params] - Array opcional de valores para substituir os placeholders na query.
 * @returns {Promise<T | null>} - Uma Promise que resolve para um objeto do tipo `T` ou `null` se não houver resultados.
 *
 * @example
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * // Consulta um usuário pelo ID
 * const user = await executeQueryOne<User>(
 *   "SELECT id, name, email FROM users WHERE id = $1",
 *   [1]
 * );
 */
export async function executeQuerySingleResult<T>(
  text: string,
  params?: unknown[]
): Promise<T | null> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows[0] ?? null;
  } finally {
    client.release();
  }
}

/**
 * Executa uma consulta SQL no banco de dados PostgreSQL que não retorna linhas (ex: INSERT, UPDATE, DELETE sem RETURNING).
 *
 * @param {string} text - A string da query SQL, com placeholders `$1, $2, ...` para parâmetros.
 * @param {unknown[]} [params] - Array opcional de valores para substituir os placeholders na query.
 * @returns {Promise<void>} - Uma Promise que resolve quando a query for executada com sucesso, sem retorno de dados.
 *
 * @example
 * // Exemplo de uso: deletar um usuário pelo ID
 * await executeQueryNoReturn("DELETE FROM users WHERE id = $1", [userId]);
 */
export async function executeQueryNoReturn(
  text: string,
  params?: unknown[]
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(text, params);
  } finally {
    client.release();
  }
}

// ADD os inserts aqui!
export async function seedDatabase() {
  try {
    await createDatabase();
    await executeQuerySingleResult(INSERT_DOADORES);
    await executeQuerySingleResult(INSERT_PESSOAS);
    await executeQuerySingleResult(INSERT_USUARIOS);
    await executeQuerySingleResult(INSERT_LISTAS_DE_DESEJOS);
    console.log("Mocks inseridos com sucesso!");
  } catch (err) {
    console.error("Erro ao inserir mocks:", err);
  }
}

export async function createDatabase(): Promise<void> {
  await executeQueryNoReturn(TABLES);
}
