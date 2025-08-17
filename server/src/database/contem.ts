export interface Contem {
  readonly listaDeDesejosId: number;
  readonly publicacaoId: number;
}

export const CREATE_CONTEM_TABLE = `
  CREATE TABLE IF NOT EXISTS CONTEM (
    ID_Lista INTEGER NOT NULL,
    ID_Publicacao INTEGER NOT NULL,
    CONSTRAINT pk_contem PRIMARY KEY (ID_Lista, ID_Publicacao),
    CONSTRAINT fk_contem_lista 
      FOREIGN KEY (ID_Lista) 
      REFERENCES LISTA_DE_DESEJOS(ID_Lista) 
      ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_contem_publicacao 
      FOREIGN KEY (ID_Publicacao) 
      REFERENCES PUBLICACAO(ID_Publicacao) 
      ON DELETE CASCADE ON UPDATE CASCADE
  );
`;

export const ADD_PUBLICACAO_NA_LISTA = `
  INSERT INTO CONTEM (ID_Lista, ID_Publicacao)
  VALUES ($1, $2)
  RETURNING 
    ID_Lista as "listaDeDesejosId", 
    ID_Publicacao as "publicacaoId";
`;

export const REMOVE_PUBLICACAO_DA_LISTA = `
  DELETE FROM CONTEM 
  WHERE ID_Lista = $1 AND ID_Publicacao = $2;
`;

export const SELECT_PUBLICACOES_DA_LISTA = `
  SELECT 
    p.ID_Publicacao as "id",
    p.Titulo as "titulo"
  FROM PUBLICACAO p
  JOIN CONTEM c ON p.ID_Publicacao = c.ID_Publicacao
  WHERE c.ID_Lista = $1;
`;

export const VERIFY_PUBLICACAO_IN_LISTA = `
  SELECT 1 FROM CONTEM 
  WHERE ID_Lista = $1 AND ID_Publicacao = $2;
`;