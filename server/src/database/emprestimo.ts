export interface Emprestimo {
  //pk composta
  readonly usuarioId: number;
  readonly exemplarId: number;
  readonly dataEmprestimo: Date;
  dataPrevistaDevolucao: Date;
  dataRealDevolucao?: Date;
  status: 'ATIVO' | 'DEVOLVIDO' | 'ATRASADO';
  valorMulta: number;
}


export const CREATE_EMPRESTIMO_TABLE = `
  CREATE TABLE IF NOT EXISTS EMPRESTIMO (
    ID_Usuario INTEGER NOT NULL,
    id_exemplar INTEGER NOT NULL,
    Data_emprestimo TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Data_prevista_devolucao DATE NOT NULL,
    Data_real_devolucao TIMESTAMP WITH TIME ZONE,
    Status VARCHAR(10) NOT NULL DEFAULT 'ATIVO' CHECK (Status IN ('ATIVO', 'DEVOLVIDO', 'ATRASADO')),
    Valor_multa NUMERIC(10, 2) DEFAULT 0.00,
    CONSTRAINT pk_emprestimo PRIMARY KEY (ID_Usuario,id_exemplar, Data_emprestimo),
    CONSTRAINT fk_emprestimo_usuario
      FOREIGN KEY (ID_Usuario) REFERENCES USUARIO(id_pessoa)
      ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_emprestimo_publicacao
      FOREIGN KEY (id_exemplar) REFERENCES EXEMPLAR(id_exemplar)
      ON DELETE RESTRICT ON UPDATE CASCADE
  );
`;

export const INSERT_EMPRESTIMO = `
  INSERT INTO EMPRESTIMO (ID_Usuario, id_exemplar, Data_prevista_devolucao, Valor_multa)
  VALUES ($1, $2, $3, $4)
  RETURNING 
    ID_Usuario as "usuarioId",
    id_exemplar as "id_exemplar",
    Data_emprestimo as "dataEmprestimo",
    Data_prevista_devolucao as "dataPrevistaDevolucao",
    Data_real_devolucao as "dataRealDevolucao",
    Status,
    Valor_multa as "valorMulta";
`;

export const UPDATE_EMPRESTIMO_REGISTRAR_DEVOLUCAO = `
  UPDATE EMPRESTIMO
  SET 
    Status = 'DEVOLVIDO', 
    Data_real_devolucao = NOW(), 
    Valor_multa = $3 
  WHERE 
    ID_Usuario = $1 AND 
    id_exemplar = $2 
  RETURNING *;
`;

export const SELECT_EMPRESTIMO_BY_PK = `
  SELECT 
    ID_Usuario as "usuarioId",
    id_exemplar as "id_exemplar",
    Data_emprestimo as "dataEmprestimo",
    Data_prevista_devolucao as "dataPrevistaDevolucao",
    Data_real_devolucao as "dataRealDevolucao",
    Status,
    Valor_multa as "valorMulta"
  FROM EMPRESTIMO
  WHERE ID_Usuario = $1 AND id_exemplar = $2 
`;

export const SELECT_EMPRESTIMOS_ATIVOS_BY_USUARIO_ID = `
  SELECT 
    ID_Usuario as "usuarioId",
    id_exemplar as "id_exemplar",
    Data_emprestimo as "dataEmprestimo",
    Data_prevista_devolucao as "dataPrevistaDevolucao",
    Status,
    Valor_multa as "valorMulta"
  FROM EMPRESTIMO
  WHERE ID_Usuario = $1 AND Status IN ('ATIVO', 'ATRASADO');
`;
