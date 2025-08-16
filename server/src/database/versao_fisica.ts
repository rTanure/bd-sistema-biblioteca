export interface VersaoFisica {
  id_versao_fisica: number; 
  id_exemplar: number;
  estado_conservacao: string;
  tipo_capa: string;
  localizacao: string;
}

export const CREATE_VERSAO_FISICA_TABLE = `
    CREATE TABLE IF NOT EXISTS versao_fisica (
        id_versao_fisica SERIAL PRIMARY KEY,
        id_exemplar INT NOT NULL UNIQUE,
        estado_conservacao VARCHAR(50),
        tipo_capa VARCHAR(50),
        localizacao VARCHAR(100),
        FOREIGN KEY (id_exemplar) REFERENCES exemplar(id_exemplar) ON DELETE CASCADE
    );
`;

export const CREATE_VERSAO_FISICA = `
    INSERT INTO versao_fisica (id_exemplar, estado_conservacao, tipo_capa, localizacao)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
`;

export const GET_VERSAO_FISICA_BY_ID = `
    SELECT * FROM versao_fisica WHERE id_versao_fisica = $1;
`;

export const GET_ALL_VERSOES_FISICAS = `
    SELECT * FROM versao_fisica ORDER BY id_versao_fisica;
`;

export const UPDATE_VERSAO_FISICA = `
    UPDATE versao_fisica
    SET id_exemplar = $2, estado_conservacao = $3, tipo_capa = $4, localizacao = $5
    WHERE id_versao_fisica = $1
    RETURNING *;
`;

export const DELETE_VERSAO_FISICA = `
    DELETE FROM versao_fisica WHERE id_versao_fisica = $1;
`;
