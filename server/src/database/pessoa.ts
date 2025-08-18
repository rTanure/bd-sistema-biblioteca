export interface Pessoa {

  readonly id: number;
  nome: string;
  data_de_nascimento: Date;
  e_mail: string;
  idade?: number;
  cpf: string;
  senha: string;

}

export const CREATE_PESSOA_TABLE = `
   CREATE TABLE IF NOT EXISTS pessoa (
       id SERIAL PRIMARY KEY,
       nome VARCHAR(100) NOT NULL,
       data_de_nascimento DATE,
       e_mail VARCHAR(100) UNIQUE,
       cpf VARCHAR(11) UNIQUE NOT NULL, 
       senha VARCHAR(255) NOT NULL
   );
`;

export const INSERT_PESSOA = `
  INSERT INTO pessoa (nome, data_de_nascimento, e_mail, cpf, senha)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;


export const FIND_BY_EMAIL = `
  SELECT * FROM pessoa 
  WHERE e_mail = $1;
`

export const SELECT_PESSOA_BY_ID = `
  SELECT * FROM pessoa 
  WHERE id = $1;
`;

export const UPDATE_PESSOA = `
  UPDATE pessoa 
  SET nome = $2, data_de_nascimento = $3, e_mail = $4, cpf = $5, senha = $6
  WHERE id = $1
  RETURNING *;
`;

export const DELETE_PESSOA = `
  DELETE FROM pessoa 
  WHERE id = $1
  RETURNING *;
`;

export const IDADE_PESSOA = `
  SELECT *,
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, data_de_nascimento)) AS idade
  FROM pessoa;
`;