export interface BIBLIOTECARIO {
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