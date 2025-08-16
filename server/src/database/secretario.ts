export interface Secretario {
 id_pessoa: number;   
 area_atuacao: string;
 ramal_telefonico: string;
 nivel_acesso_sistema: string;

}

export const CREATE_SECRETARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS secretario (
       id_pessoa INTEGER PRIMARY KEY,
       area_atuacao VARCHAR(100),
       ramal_telefonico VARCHAR(10),
       nivel_acesso_sistema VARCHAR(20) DEFAULT 'Básico' 
           CHECK (nivel_acesso_sistema IN ('Básico', 'Intermediário', 'Avançado', 'Administrador')),
       CONSTRAINT fk_secretario_funcionario 
           FOREIGN KEY (id_pessoa) REFERENCES funcionario(id_pessoa) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;

const INSERT_SECRETARIO = `
  INSERT INTO secretario (area_atuacao, ramal_telefonico, nivel_acesso_sistema)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

const SELECT_SECRETARIO_BY_ID = `
  SELECT * FROM secretario 
  WHERE id_pessoa = $1;
`;

const UPDATE_SECRETARIO = `
  UPDATE secretario 
  SET area_atuacao = $2, ramal_telefonico = $3, nivel_acesso_sistema = $4
  WHERE id_pessoa = $1
  RETURNING *;
`;

const DELETE_SECRETARIO = `
  DELETE FROM secretario 
  WHERE id_pessoa = $1
  RETURNING *;
`;