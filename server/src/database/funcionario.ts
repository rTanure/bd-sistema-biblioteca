export interface Funcionario {
 id_pessoa: number;
 matricula: string;
 data_admissao: string;
 salario: number;
 turno: string;
 cargo: string;
 
}

export const CREATE_FUNCIONARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS funcionario (
       id_pessoa INTEGER PRIMARY KEY, 
       matricula VARCHAR(20) NOT NULL UNIQUE,
       data_admissao DATE NOT NULL,
       salario DECIMAL(10,2) CHECK (salario > 0),
       turno VARCHAR(20) CHECK (turno IN ('Manhã', 'Tarde', 'Noite', 'Integral')),
       cargo VARCHAR(50) NOT NULL,
       CONSTRAINT fk_funcionario_pessoa 
           FOREIGN KEY (id_pessoa) REFERENCES pessoa(id) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;

export const INSERT_FUNCIONARIO = `
  INSERT INTO funcionario (id_pessoa, matricula, data_admissao, salario, turno, cargo)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`;

export const SELECT_FUNCIONARIO_BY_ID = `
  SELECT * FROM funcionario 
  WHERE id_pessoa = $1;
`;

export const UPDATE_FUNCIONARIO = `
  UPDATE funcionario 
  SET salario = $2, turno = $3
  WHERE id_pessoa = $1
  RETURNING *;
`;

export const DELETE_FUNCIONARIO = `
  DELETE FROM funcionario  
  WHERE id_pessoa = $1
  RETURNING *;
`;