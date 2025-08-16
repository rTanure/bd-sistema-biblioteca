export interface LISTA_DE_DESEJOS {
 id_usuario: number;
 nome_lista: string;
}

export const CREATE_LISTA_DE_DESEJOS_TABLE = `
   CREATE TABLE IF NOT EXISTS LISTA_DE_DESEJOS (
       id_usuario INTEGER primary key,
       nome_lista VARCHAR(100) NOT NULL DEFAULT 'Minha Lista de Desejos',
       CONSTRAINT fk_lista_usuario 
           FOREIGN KEY (id_usuario) REFERENCES usuario(id_pessoa) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;