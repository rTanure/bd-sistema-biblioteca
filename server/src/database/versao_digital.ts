export interface VersaoDigital {
  id_versao_digital: number; 
  id_exemplar: number;
  formato_arquivo: string;
  tamanho_arquivo: number;
  url_acesso: string;
}

export const CREATE_VERSAO_DIGITAL_TABLE = `
    CREATE TABLE IF NOT EXISTS versao_digital (
        id_versao_digital SERIAL PRIMARY KEY,
        id_exemplar INT NOT NULL UNIQUE, -- UNIQUE garante a relação 1-para-1 com exemplar
        formato_arquivo VARCHAR(20),
        tamanho_arquivo_mb NUMERIC(10, 2), -- Usar NUMERIC para tamanhos de arquivo é uma boa prática
        url_acesso TEXT NOT NULL,
        FOREIGN KEY (id_exemplar) REFERENCES exemplar(id_exemplar) ON DELETE CASCADE
    );
`;

export const CREATE_VERSAO_DIGITAL = `
    INSERT INTO versao_digital (id_exemplar, formato_arquivo, tamanho_arquivo_mb, url_acesso)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
`;

export const GET_VERSAO_DIGITAL_BY_ID = `
    SELECT * FROM versao_digital WHERE id_versao_digital = $1;
`;

export const GET_ALL_VERSOES_DIGITAIS = `
    SELECT * FROM versao_digital ORDER BY formato_arquivo;
`;

export const UPDATE_VERSAO_DIGITAL = `
    UPDATE versao_digital
    SET id_exemplar = $2, formato_arquivo = $3, tamanho_arquivo_mb = $4, url_acesso = $5
    WHERE id_versao_digital = $1
    RETURNING *;
`;

export const DELETE_VERSAO_DIGITAL = `
    DELETE FROM versao_digital WHERE id_versao_digital = $1;
`;
