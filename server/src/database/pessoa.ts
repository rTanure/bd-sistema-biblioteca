
export interface PESSOA {
 ID: number;
 Nome: string;
 Data_de_nascimento: string;
 E_mail: string;
 Idade: number;
 CPF: string;
 Senha: string;
}

export const CREATE_PESSOA_TABLE = `
   CREATE TABLE IF NOT EXISTS PESSOA (
       ID SERIAL PRIMARY KEY,
       Nome VARCHAR(100) NOT NULL,
       Data_de_nascimento DATE,
       E_mail VARCHAR(100) UNIQUE,
       Idade INTEGER CHECK (Idade >= 0 AND Idade <= 150),
       CPF VARCHAR(11) UNIQUE NOT NULL, -- CPF deve ser obrigatório
       Senha VARCHAR(255) NOT NULL
   );
`;