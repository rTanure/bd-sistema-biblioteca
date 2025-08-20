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

export const UPDATE_EXEMPLAR_STATUS = `
  UPDATE exemplar
  SET status = $2
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

export const GET_EXEMPLARES_EMPRESTADOS = `
  SELECT 
    p.titulo AS "titulo",
    e.id_exemplar AS "idExemplar",
    emp.Data_emprestimo AS "dataEmprestimo",
    emp.Data_prevista_devolucao AS "dataPrevistaDevolucao",
    emp.Data_real_devolucao AS "dataRealDevolucao"
  FROM exemplar e
  JOIN publicacao p ON e.id_publicacao = p.id_publicacao
  JOIN emprestimo emp ON e.id_exemplar = emp.id_exemplar
  WHERE e.status = 'EMPRESTADO'
    AND emp.Data_real_devolucao IS NULL
  ORDER BY emp.Data_prevista_devolucao;
`;
export const GET_EXEMPLARES_EM_ATRASO = `
  SELECT 
    p.titulo AS "titulo",
    e.id_exemplar AS "idExemplar",
    emp.data_emprestimo AS "dataEmprestimo",
    emp.data_prevista_devolucao AS "dataPrevistaDevolucao",
    emp.data_real_devolucao AS "dataRealDevolucao"
  FROM exemplar e
  JOIN publicacao p ON e.id_publicacao = p.id_publicacao
  LEFT JOIN emprestimo emp ON e.id_exemplar = emp.id_exemplar
  WHERE emp.data_real_devolucao IS NULL
    AND e.status = 'EMPRESTADO'
    AND emp.data_prevista_devolucao < CURRENT_DATE
  ORDER BY emp.data_prevista_devolucao;
`;

export const GET_EXEMPLARES_DISPONIVEIS_POR_PUBLICACAO = `
  SELECT 
    p.id_publicacao,
    p.titulo,
    COUNT(e.id_exemplar) AS total_disponiveis
  FROM exemplar e
  JOIN publicacao p ON e.id_publicacao = p.id_publicacao
  WHERE e.status = 'DISPONIVEL'
  GROUP BY p.id_publicacao, p.titulo
  ORDER BY total_disponiveis DESC;
`;
