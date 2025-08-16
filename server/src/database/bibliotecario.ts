export interface Bibliotecario {
 id_pessoa: number;
 area_especializacao: string;
 crb_numero: string;
 descricao_especializacao: string;
 
}

export const CREATE_BIBLIOTECARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS bibliotecario (
       id_pessoa INTEGER PRIMARY KEY,
       area_especializacao VARCHAR(100),
       crb_numero VARCHAR(20) UNIQUE NOT NULL,
       descricao_especializacao TEXT,
       CONSTRAINT fk_bibliotecario_funcionario 
           FOREIGN KEY (id_pessoa) REFERENCES funcionario(id_pessoa) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;

const INSERT_BIBLIOTECARIO = `
  INSERT INTO bibliotecario (area_especializacao, crb_numero, descricao_especializacao)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

const SELECT_BIBLIOTECARIO_BY_ID = `
  SELECT * FROM bibliotecario 
  WHERE id_pessoa = $1;
`;

const UPDATE_BIBLIOTECARIO = `
  UPDATE bibliotecario 
  SET area_especializacao = $2, crb_numero = $3, descricao_especializacao = $4
  WHERE id_pessoa = $1
  RETURNING *;
`;

const DELETE_BIBLIOTECARIO = `
  DELETE FROM bibliotecario 
  WHERE id_pessoa = $1
  RETURNING *;
`;