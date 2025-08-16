
export interface PESSOA {
 id: number;
 nome: string;
 data_de_nascimento: string;
 e_mail: string;
 idade: number;
 cpf: string;
 senha: string;
}

export const CREATE_PESSOA_TABLE = `
   CREATE TABLE IF NOT EXISTS pessoa (
       id SERIAL PRIMARY KEY,
       nome VARCHAR(100) NOT NULL,
       data_de_nascimento DATE,
       e_mail VARCHAR(100) UNIQUE,
       idade INTEGER CHECK (Idade >= 0 AND Idade <= 150),
       cpf VARCHAR(11) UNIQUE NOT NULL, 
       senha VARCHAR(255) NOT NULL
   );
`;