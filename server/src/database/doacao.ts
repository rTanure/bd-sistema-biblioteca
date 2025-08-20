export interface Doacao {
  readonly id: number;
  readonly doadorId: number; 
  dataHoraDoacao: Date;
  descricao: string;
}

export const CREATE_DOACAO_TABLE = `
  CREATE TABLE IF NOT EXISTS DOACAO (
    id_doacao SERIAL PRIMARY KEY,
    id_doador INTEGER NOT NULL,
    data_hora_doacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    CONSTRAINT fk_doacao_doador
      FOREIGN KEY (id_doador) 
      REFERENCES DOADOR(id_doador)
      ON DELETE CASCADE ON UPDATE CASCADE
  );
`;

export const INSERT_DOACAO = `
  INSERT INTO DOACAO (id_doador, descricao)
  VALUES ($1, $2)
  RETURNING 
    id_doacao as "id", 
    id_doador as "doadorId", 
    data_hora_doacao as "dataHoraDoacao", 
    descricao as "descricao";
`;

export const SELECT_DOACAO_BY_ID = `
  SELECT 
    id_doacao as "id", 
    id_doador as "doadorId", 
    data_hora_doacao as "dataHoraDoacao", 
    descricao as "descricao"
  FROM DOACAO
  WHERE id_doacao = $1;
`;

export const SELECT_DOACOES_BY_DOADOR_ID = `
  SELECT 
    id_doacao as "id", 
    id_doador as "doadorId", 
    data_hora_doacao as "dataHoraDoacao", 
    descricao as "descricao"
  FROM DOACAO
  WHERE id_doador = $1
  ORDER BY data_hora_doacao DESC;
`;
