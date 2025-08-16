export interface Publicacao {
  id_publicacao: number;
  titulo: string;
  autor: string;
  editora: string;
  ano_publicacao: number;
  edicao: string;
  numero_paginas: number;
  genero: string;
}

export const CREATE_PUBLICACAO_TABLE = `
    CREATE TABLE IF NOT EXISTS publicacao (
        id_publicacao SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR(150) NOT NULL,
        editora VARCHAR(150) NOT NULL,
        ano_publicacao INTEGER NOT NULL,
        edicao VARCHAR(50),
        numero_paginas INTEGER,
        genero VARCHAR(100)
    );
`;

export const CREATE_PUBLICACAO = `
    INSERT INTO publicacao (titulo, autor, editora, ano_publicacao, edicao, numero_paginas, genero)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
`;

export const GET_PUBLICACAO_BY_ID = `
    SELECT * FROM publicacao WHERE id_publicacao = $1;
`;

export const GET_ALL_PUBLICACOES = `
    SELECT * FROM publicacao ORDER BY titulo;
`;

export const UPDATE_PUBLICACAO = `
    UPDATE publicacao 
    SET titulo = $2, autor = $3, editora = $4, ano_publicacao = $5, 
        edicao = $6, numero_paginas = $7, genero = $8
    WHERE id_publicacao = $1
    RETURNING *;
`;

export const DELETE_PUBLICACAO = `
    DELETE FROM publicacao WHERE id_publicacao = $1;
`;

export const SEARCH_PUBLICACOES_BY_TITULO = `
    SELECT * FROM publicacao 
    WHERE titulo ILIKE '%' || $1 || '%'
    ORDER BY titulo;
`;

export const SEARCH_PUBLICACOES_BY_AUTOR = `
    SELECT * FROM publicacao 
    WHERE autor ILIKE '%' || $1 || '%'
    ORDER BY autor, titulo;
`;

export const GET_PUBLICACOES_BY_GENERO = `
    SELECT * FROM publicacao 
    WHERE genero = $1
    ORDER BY titulo;
`;

export const GET_PUBLICACOES_BY_ANO = `
    SELECT * FROM publicacao 
    WHERE ano_publicacao BETWEEN $1 AND $2
    ORDER BY ano_publicacao DESC, titulo;
`;