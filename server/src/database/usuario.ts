export interface usuario{
 id_pessoa: number;  
 id_leitor: number;
 data_cadastro: string;
 status_conta: string;
}

export const CREATE_USUARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS usuario (
       id_pessoa INTEGER PRIMARY KEY,
       id_leitor SERIAL NOT NULL UNIQUE,
       data_cadastro DATE NOT NULL DEFAULT CURRENT_DATE,
       status_conta VARCHAR(20) DEFAULT 'Ativo' 
           CHECK (status_conta IN ('Ativo', 'Inativo', 'Suspenso', 'Bloqueado')),
       CONSTRAINT fk_usuario_pessoa 
           FOREIGN KEY (id_pessoa) REFERENCES pessoa(id) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;