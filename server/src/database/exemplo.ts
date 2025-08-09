
// exemplo de schema => tem que refletir os atributos do banco
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

// exemplo de queries
export const CREATE_USER_TABLE = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export const CREATE_USER = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
`