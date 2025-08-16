export interface SECRETARIO {
 ID_Pessoa: number;   
 Area_atuacao: string;
 Ramal_telefonico: string;
 Nivel_acesso_sistema: 'Básico' | 'Intermediário' | 'Avançado' | 'Administrador';

}

export const CREATE_SECRETARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS SECRETARIO (
       ID_Pessoa INTEGER PRIMARY KEY,
       Area_atuacao VARCHAR(100),
       Ramal_telefonico VARCHAR(10),
       Nivel_acesso_sistema VARCHAR(20) DEFAULT 'Básico' 
           CHECK (Nivel_acesso_sistema IN ('Básico', 'Intermediário', 'Avançado', 'Administrador')),
       
       CONSTRAINT FK_Secretario_Funcionario 
           FOREIGN KEY (ID_Pessoa) REFERENCES FUNCIONARIO(ID_Pessoa) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;