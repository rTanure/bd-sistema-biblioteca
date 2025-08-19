export interface Exemplar {
    id_exemplar: number;
    id_publicacao: number;
    id_doacao?: number;
    status: 'DISPONIVEL' | 'EMPRESTADO' | 'RESERVADO';
    data_aquisicao: string;
    origem_publicacao: 'DOACAO' | 'COMPRA' | 'TRANSFERENCIA' | 'OUTRA';
}

export const CREATE_EXEMPLAR_TABLE = `
  CREATE TABLE IF NOT EXISTS exemplar (
    id_exemplar SERIAL PRIMARY KEY,
    id_publicacao INT NOT NULL,
    id_doacao INT,
    status VARCHAR(50) NOT NULL CHECK (status IN ('DISPONIVEL', 'EMPRESTADO', 'RESERVADO')),
    data_aquisicao DATE NOT NULL CHECK (data_aquisicao <= CURRENT_DATE),
    origem_publicacao VARCHAR(20) NOT NULL CHECK (
      origem_publicacao IN ('DOACAO', 'COMPRA', 'TRANSFERENCIA', 'OUTRA')
    ),
    FOREIGN KEY (id_publicacao) REFERENCES publicacao(id_publicacao)
      ON DELETE CASCADE
  );
`;


export const CREATE_EXEMPLAR = `
  INSERT INTO exemplar (
    id_publicacao, id_doacao, status, data_aquisicao, origem_publicacao
  )
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

export const GET_EXEMPLAR_BY_ID = `
    SELECT * FROM exemplar WHERE id_exemplar = $1;
`;

export const GET_ALL_EXEMPLARES = `
    SELECT * FROM exemplar ORDER BY id_exemplar;
`;

export const UPDATE_EXEMPLAR = `
  UPDATE exemplar
  SET id_publicacao = $2,
      id_doacao = $3,
      status = $4,
      data_aquisicao = $5,
      origem_publicacao = $6
  WHERE id_exemplar = $1
  RETURNING *;
`;

export const DELETE_EXEMPLAR = `
    DELETE FROM exemplar WHERE id_exemplar = $1;
`;

export const SEARCH_EXEMPLARES_BY_STATUS = `
    SELECT * FROM exemplar 
    WHERE status ILIKE '%' || $1 || '%'
    ORDER BY data_aquisicao DESC;
`;

export const GET_EXEMPLARES_BY_ORIGEM = `
  SELECT * FROM exemplar 
  WHERE origem_publicacao = $1
  ORDER BY data_aquisicao DESC;
`;
export const GET_EXEMPLARES_BY_PUBLICACAO = `
    SELECT * FROM exemplar 
    WHERE id_publicacao = $1
    ORDER BY data_aquisicao DESC;
`;