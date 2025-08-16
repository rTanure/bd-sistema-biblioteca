export interface LISTA_DE_DESEJOS {
 ID_Usuario: number;
 Nome_lista: string;
}

export const CREATE_LISTA_DE_DESEJOS_TABLE = `
   CREATE TABLE IF NOT EXISTS LISTA_DE_DESEJOS (
       ID_Usuario INTEGER NOT NULL UNIQUE, 
       Nome_lista VARCHAR(100) NOT NULL DEFAULT 'Minha Lista de Desejos',
       
       CONSTRAINT FK_Lista_Usuario 
           FOREIGN KEY (ID_Usuario) REFERENCES USUARIO(ID_PESSOA) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;