export interface Gerencia {
  id_pessoa: number;
  id_publicacao: number;
  data_verificacao: string;
  observacao: string;
  descricao: string;
}

export const CREATE_GERENCIA_TABLE = `
    CREATE TABLE IF NOT EXISTS gerencia (
        id_pessoa INT NOT NULL,
        id_publicacao INT NOT NULL,
        data_verificacao DATE,
        observacao TEXT,
        descricao TEXT,
        PRIMARY KEY (id_pessoa, id_publicacao),
        FOREIGN KEY (id_pessoa) REFERENCES bibliotecario(id_pessoa) ON DELETE CASCADE,
        FOREIGN KEY (id_publicacao) REFERENCES publicacao(id_publicacao) ON DELETE CASCADE
    );
`;

export const CREATE_GERENCIA = `
    INSERT INTO gerencia (id_pessoa, id_publicacao, data_verificacao, observacao,descricao)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
`;


export const GET_GERENCIA_BY_ID = `
    SELECT * FROM gerencia 
    WHERE id_pessoa = $1 AND id_publicacao = $2;
`;

export const GET_ALL_GERENCIA = `
    SELECT * FROM gerencia ORDER BY data_verificacao DESC;
`;


export const UPDATE_GERENCIA = `
    UPDATE gerencia
    SET data_verificacao = $3, observacao = $4 , descricao = $5
    WHERE id_pessoa = $1 AND id_publicacao = $2
    RETURNING *;
`;


export const DELETE_GERENCIA = `
    DELETE FROM gerencia 
    WHERE id_pessoa = $1 AND id_publicacao = $2;
`;