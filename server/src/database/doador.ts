export interface Doador {
  readonly id: number;
  tipoPessoa: string;
  recebeInformativos: boolean;
}

export const CREATE_DOADOR_TABLE = `
  CREATE TABLE IF NOT EXISTS DOADOR (
    ID_Doador SERIAL PRIMARY KEY,
    Tipo_pessoa VARCHAR(20) NOT NULL,
    Recebe_informativos BOOLEAN DEFAULT TRUE,
    CONSTRAINT chk_tipo_doador CHECK (
      (Tipo_pessoa = 'PESSOA_FISICA' AND ID_Pessoa IS NOT NULL AND ID_Orgao IS NULL) OR
      (Tipo_pessoa = 'PESSOA_JURIDICA' AND ID_Orgao IS NOT NULL AND ID_Pessoa IS NULL)
    )
  );
`;

export const INSERT_DOADOR_PESSOA_FISICA = `
  INSERT INTO DOADOR (Tipo_pessoa, Recebe_informativos)
  VALUES ($1, 'PESSOA_FISICA', $2)
  RETURNING 
    ID_Doador as "id",
    Tipo_pessoa as "tipoPessoa", 
    Recebe_informativos as "recebeInformativos";
`;

export const INSERT_DOADOR_ORGAO_EXTERNO = `
  INSERT INTO DOADOR (Tipo_pessoa, Recebe_informativos)
  VALUES ($1, 'PESSOA_JURIDICA', $2)
  RETURNING 
    ID_Doador as "id",
    Tipo_pessoa as "tipoPessoa", 
    Recebe_informativos as "recebeInformativos";
`;

export const SELECT_DOADOR_BY_ID = `
  SELECT 
    ID_Doador as "id",
    Tipo_pessoa as "tipoPessoa", 
    Recebe_informativos as "recebeInformativos"
  FROM DOADOR 
  WHERE ID_Doador = $1;
`;

export const UPDATE_DOADOR_INFO = `
  UPDATE DOADOR
  SET Recebe_informativos = $2
  WHERE ID_Doador = $1
  RETURNING *;
`;

export const DELETE_DOADOR = `
  DELETE FROM DOADOR
  WHERE ID_Doador = $1;
`;
