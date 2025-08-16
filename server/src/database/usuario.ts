export interface USUARIO {
 ID_Pessoa: number;  
 ID_leitor: number;
 Data_cadastro: string;
 Status_conta: 'Ativo' | 'Inativo' | 'Suspenso' | 'Bloqueado';
}

export const CREATE_USUARIO_TABLE = `
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