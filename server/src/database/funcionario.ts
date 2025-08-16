export interface FUNCIONARIO {
 id_pessoa: number;
 matricula: string;
 data_admissao: string;
 salario: number;
 turno: 'Manhã' | 'Tarde' | 'Noite' | 'Integral';
 cargo: string;
 
}

export const CREATE_FUNCIONARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS funcionario (
       id_pessoa INTEGER PRIMARY KEY, 
       matricula VARCHAR(20) NOT NULL UNIQUE,
       data_admissao DATE NOT NULL,
       salario DECIMAL(10,2) CHECK (Salario > 0),
       turno VARCHAR(20) CHECK (Turno IN ('Manhã', 'Tarde', 'Noite', 'Integral')),
       cargo VARCHAR(50) NOT NULL,
       CONSTRAINT fk_funcionario_pessoa 
           FOREIGN KEY (id_pessoa) REFERENCES pessoa(id) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;