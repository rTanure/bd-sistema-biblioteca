export interface Usuario{
 id_pessoa: number;  
 id_leitor: number;
 data_cadastro: string;
 status_conta: string;
}

export const CREATE_USUARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS usuario (
       id_leitor SERIAL PRIMARY KEY,
        id_pessoa INTEGER NOT NULL UNIQUE,
       data_cadastro DATE NOT NULL DEFAULT CURRENT_DATE,
       status_conta VARCHAR(20) DEFAULT 'Ativo' 
           CHECK (status_conta IN ('Ativo', 'Inativo', 'Suspenso', 'Bloqueado')),
       CONSTRAINT fk_usuario_pessoa 
           FOREIGN KEY (id_pessoa) REFERENCES pessoa(id) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;

export const INSERT_USUARIO = `

  INSERT INTO usuario ( id_pessoa, data_cadastro, status_conta)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

export const SELECT_USUARIO_BY_ID = `
  SELECT * FROM usuario 
  WHERE id_pessoa = $1;
`;

export const UPDATE_USUARIO = `
  UPDATE usuario 
  SET data_cadastro = $2, status_conta= $3
  WHERE id_pessoa = $1
  RETURNING *;
`;

export const DELETE_USUARIO = `
  DELETE FROM usuario 
  WHERE id_pessoa = $1
  RETURNING *;
`;