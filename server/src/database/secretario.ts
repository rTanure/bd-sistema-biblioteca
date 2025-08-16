export interface Secretario {
 id_pessoa: number;   
 area_atuacao: string;
 ramal_telefonico: string;
 nivel_acesso_sistema: string;

}

export const CREATE_SECRETARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS secretario (
       id_pessoa INTEGER PRIMARY KEY,
       area_atuacao VARCHAR(100),
       ramal_telefonico VARCHAR(10),
       nivel_acesso_sistema VARCHAR(20) DEFAULT 'Básico' 
           CHECK (nivel_acesso_sistema IN ('Básico', 'Intermediário', 'Avançado', 'Administrador')),
       CONSTRAINT fk_secretario_funcionario 
           FOREIGN KEY (id_pessoa) REFERENCES funcionario(id_pessoa) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;