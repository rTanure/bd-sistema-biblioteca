export interface Lista_de_desejos {
 id_usuario: number;
 nome_lista: string;
}

export const CREATE_LISTA_DE_DESEJOS_TABLE = `
   CREATE TABLE IF NOT EXISTS lista_de_desejos (
       id_usuario INTEGER primary key,
       nome_lista VARCHAR(100) NOT NULL DEFAULT 'Minha Lista de Desejos',
       CONSTRAINT fk_lista_usuario 
           FOREIGN KEY (id_usuario) REFERENCES usuario(id_pessoa) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );
`;

export const INSERT_LISTA = `
  INSERT INTO lista_de_desejos (id_usuario, nome_lista)
  VALUES ($1, $2)
  RETURNING *;
`;
export const SELECT_LISTA_BY_ID = `
  SELECT * FROM lista_de_desejos 
  WHERE id_usuario = $1;
`;

export const UPDATE_LISTA = `
  UPDATE lista_de_desejos 
  SET nome_lista = $2
  WHERE id_usuario = $1
  RETURNING *;
`;

export const DELETE_LISTA = `
  DELETE FROM lista_de_desejos  
  WHERE id_usuario = $1
  RETURNING *;
`;