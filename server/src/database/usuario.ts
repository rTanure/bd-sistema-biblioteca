export interface USUARIO {
 ID_Pessoa: number;  
 ID_leitor: number;
 Data_cadastro: string;
 Status_conta: 'Ativo' | 'Inativo' | 'Suspenso' | 'Bloqueado';
}

export const CREATE_USUARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS USUARIO (
       ID_Pessoa INTEGER PRIMARY KEY,
       ID_leitor SERIAL NOT NULL UNIQUE,
       Data_cadastro DATE NOT NULL DEFAULT CURRENT_DATE,
       Status_conta VARCHAR(20) DEFAULT 'Ativo' 
           CHECK (Status_conta IN ('Ativo', 'Inativo', 'Suspenso', 'Bloqueado')),
       
       CONSTRAINT FK_Usuario_Pessoa 
           FOREIGN KEY (ID_Pessoa) REFERENCES PESSOA(ID) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;