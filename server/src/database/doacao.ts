export interface Doacao {
  readonly id: number;
  readonly doadorId: number; 
  dataHoraDoacao: Date;
  descricao: string;
}

export const CREATE_DOACAO_TABLE = `
  CREATE TABLE IF NOT EXISTS DOACAO (
    ID_Doacao SERIAL PRIMARY KEY,
    ID_Doador INTEGER NOT NULL,
    Data_hora_doacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    Descricao TEXT,
    
    CONSTRAINT fk_doacao_doador
      FOREIGN KEY (ID_Doador) 
      REFERENCES DOADOR(ID_Doador)
      ON DELETE CASCADE ON UPDATE CASCADE
  );
`;

export const INSERT_DOACAO = `
  INSERT INTO DOACAO (ID_Doador, Descricao)
  VALUES ($1, $2)
  RETURNING 
    ID_Doacao as "id", 
    ID_Doador as "doadorId", 
    Data_hora_doacao as "dataHoraDoacao", 
    Descricao as "descricao";
`;

export const SELECT_DOACAO_BY_ID = `
  SELECT 
    ID_Doacao as "id", 
    ID_Doador as "doadorId", 
    Data_hora_doacao as "dataHoraDoacao", 
    Descricao as "descricao"
  FROM DOACAO
  WHERE ID_Doacao = $1;
`;

export const SELECT_DOACOES_BY_DOADOR_ID = `
  SELECT 
    ID_Doacao as "id", 
    ID_Doador as "doadorId", 
    Data_hora_doacao as "dataHoraDoacao", 
    Descricao as "descricao"
  FROM DOACAO
  WHERE ID_Doador = $1
  ORDER BY Data_hora_doacao DESC;
`;
