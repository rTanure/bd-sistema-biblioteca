export interface OrgaoExterno {
  readonly idOrgao: number;
  nomeOficial: string;
  cnpj: string;
  responsavel: string;
  email: string;
  telefone: string;
}

export const CREATE_ORGAO_EXTERNO_TABLE = `
  CREATE TABLE IF NOT EXISTS ORGAO_EXTERNO (
    ID_Orgao SERIAL PRIMARY KEY,
    ID_Doador INTEGER NOT NULL ,
    Nome_oficial VARCHAR(255) NOT NULL,
    CNPJ VARCHAR(18) UNIQUE NOT NULL,
    Responsavel VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Telefone VARCHAR(20),
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
     CONSTRAINT fk_pessoa_doador
        FOREIGN KEY (ID_Doador) REFERENCES DOADOR(ID_Doador)
        ON DELETE CASCADE ON UPDATE CASCADE
  );
`;

export const INSERT_ORGAO_EXTERNO = `
  INSERT INTO ORGAO_EXTERNO (Nome_oficial, CNPJ, Responsavel, Email, Telefone)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING 
    ID_Orgao as "idOrgao", 
    Nome_oficial as "nomeOficial", 
    CNPJ as "cnpj", 
    Responsavel as "responsavel", 
    Email as "email", 
    Telefone as "telefone", 
    CreatedAt as "createdAt";
`;

export const SELECT_ORGAO_EXTERNO_BY_ID = `
  SELECT 
    ID_Orgao as "idOrgao", 
    Nome_oficial as "nomeOficial", 
    CNPJ as "cnpj", 
    Responsavel as "responsavel", 
    Email as "email", 
    Telefone as "telefone", 
    CreatedAt as "createdAt" 
  FROM ORGAO_EXTERNO 
  WHERE ID_Orgao = $1;
`;

export const UPDATE_ORGAO_EXTERNO = `
  UPDATE ORGAO_EXTERNO
  SET 
    Nome_oficial = $2,
    CNPJ = $3,
    Responsavel = $4,
    Email = $5,
    Telefone = $6
  WHERE ID_Orgao = $1
  RETURNING 
    ID_Orgao as "idOrgao", 
    Nome_oficial as "nomeOficial", 
    CNPJ as "cnpj", 
    Responsavel as "responsavel", 
    Email as "email", 
    Telefone as "telefone", 
    CreatedAt as "createdAt";
`;

export const DELETE_ORGAO_EXTERNO = `
  DELETE FROM ORGAO_EXTERNO 
  WHERE ID_Orgao = $1;
`;