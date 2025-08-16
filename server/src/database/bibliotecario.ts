export interface BIBLIOTECARIO {
 ID_Pessoa: number;
 Area_especializacao: string;
 CRB_numero: string;
 Descricao_especializacao: string;
 
}

export const CREATE_BIBLIOTECARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS BIBLIOTECARIO (
       ID_Pessoa INTEGER PRIMARY KEY,
       Area_especializacao VARCHAR(100),
       CRB_numero VARCHAR(20) UNIQUE NOT NULL, -- CRB deve ser obrigatório
       Descricao_especializacao TEXT,
       
       CONSTRAINT FK_Bibliotecario_Funcionario 
           FOREIGN KEY (ID_Pessoa) REFERENCES FUNCIONARIO(ID_Pessoa) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;