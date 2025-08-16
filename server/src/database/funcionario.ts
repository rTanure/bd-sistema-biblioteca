export interface FUNCIONARIO {
 ID_Pessoa: number;
 Matricula: string;
 Data_admissao: string;
 Salario: number;
 Turno: 'Manhã' | 'Tarde' | 'Noite' | 'Integral';
 Cargo: string;
 
}

export const CREATE_FUNCIONARIO_TABLE = `
   CREATE TABLE IF NOT EXISTS FUNCIONARIO (
       ID_Pessoa INTEGER PRIMARY KEY, 
       Matricula VARCHAR(20) NOT NULL UNIQUE,
       Data_admissao DATE NOT NULL,
       Salario DECIMAL(10,2) CHECK (Salario > 0),
       Turno VARCHAR(20) CHECK (Turno IN ('Manhã', 'Tarde', 'Noite', 'Integral')),
       Cargo VARCHAR(50) NOT NULL,
       
       CONSTRAINT FK_Funcionario_Pessoa 
           FOREIGN KEY (ID_Pessoa) REFERENCES PESSOA(ID) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;