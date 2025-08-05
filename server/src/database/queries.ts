import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "senha",
  database: process.env.DB_NAME || "meubanco",
});

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
 * const activeUsers = await query<User>(
 *   "SELECT id, name, email FROM users WHERE active = $1",
 *   [true]
 * );
 *
 */

export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows as T[];
  } finally {
    client.release();
  }
}

