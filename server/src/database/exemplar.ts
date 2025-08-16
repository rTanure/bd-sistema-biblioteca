export interface Exemplar {
  id_exemplar: number;
  id_publicacao: number;
  status: string;
  data_aquisicao: string;
}

export const CREATE_EXEMPLAR_TABLE = `
    CREATE TABLE IF NOT EXISTS exemplar (
        id_exemplar SERIAL PRIMARY KEY,
        id_publicacao INT NOT NULL,
        status VARCHAR(50) NOT NULL,
        data_aquisicao DATE NOT NULL,
        FOREIGN KEY (id_publicacao) REFERENCES publicacao(id_publicacao)
            ON DELETE CASCADE
    );
`;

export const CREATE_EXEMPLAR = `
    INSERT INTO exemplar (id_publicacao, status, data_aquisicao)
    VALUES ($1, $2, $3)
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
    SET id_publicacao = $2, status = $3, data_aquisicao = $4
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

export const GET_EXEMPLARES_BY_PUBLICACAO = `
    SELECT * FROM exemplar 
    WHERE id_publicacao = $1
    ORDER BY data_aquisicao DESC;
`;