export const TABLES = `
CREATE TABLE IF NOT EXISTS DOADOR (
    ID_Doador SERIAL PRIMARY KEY,
    Tipo_pessoa VARCHAR(20) NOT NULL,
    Recebe_informativos BOOLEAN DEFAULT TRUE
  );


CREATE TABLE IF NOT EXISTS pessoa (
       id SERIAL PRIMARY KEY,
       nome VARCHAR(100) NOT NULL,
       data_de_nascimento DATE,
       e_mail VARCHAR(100) UNIQUE,
       cpf VARCHAR(11) UNIQUE NOT NULL, 
       senha VARCHAR(255) NOT NULL,
       ID_Doador INT unique,
       CONSTRAINT fk_pessoa_doador
       foreign KEY (ID_Doador) REFERENCES DOADOR(ID_Doador)
       ON DELETE CASCADE ON UPDATE CASCADE
);

  CREATE TABLE IF NOT EXISTS ORGAO_EXTERNO (
    ID_Orgao SERIAL PRIMARY KEY,
    ID_Doador INTEGER NOT NULL ,
    Nome_oficial VARCHAR(255) NOT NULL,
    CNPJ VARCHAR(18) UNIQUE NOT NULL,
    Responsavel VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Telefone VARCHAR(20),
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE IF NOT EXISTS funcionario (
       id_pessoa INTEGER PRIMARY KEY, 
       matricula VARCHAR(20) NOT NULL UNIQUE,
       data_admissao DATE NOT NULL,
       salario DECIMAL(10,2) CHECK (salario > 0),
       turno VARCHAR(20) CHECK (turno IN ('Manhã', 'Tarde', 'Noite', 'Integral')),
       cargo VARCHAR(50) NOT NULL,
       CONSTRAINT fk_funcionario_pessoa 
           FOREIGN KEY (id_pessoa) REFERENCES pessoa(id) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );

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

CREATE TABLE IF NOT EXISTS bibliotecario (
       id_pessoa INTEGER PRIMARY KEY,
       area_especializacao VARCHAR(100),
       crb_numero VARCHAR(20) UNIQUE NOT NULL,
       descricao_especializacao TEXT,
       CONSTRAINT fk_bibliotecario_funcionario 
           FOREIGN KEY (id_pessoa) REFERENCES funcionario(id_pessoa) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );

CREATE TABLE IF NOT EXISTS usuario (
       id_leitor SERIAL PRIMARY KEY,
        id_pessoa INTEGER NOT NULL UNIQUE,
       data_cadastro DATE NOT NULL DEFAULT CURRENT_DATE,
       status_conta VARCHAR(20) DEFAULT 'Ativo' 
           CHECK (status_conta IN ('Ativo', 'Inativo', 'Suspenso', 'Bloqueado')),
       CONSTRAINT fk_usuario_pessoa 
           FOREIGN KEY (id_pessoa) REFERENCES pessoa(id) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );

CREATE TABLE IF NOT EXISTS lista_de_desejos (
       id_usuario INTEGER primary key,
       nome_lista VARCHAR(100) NOT NULL DEFAULT 'Minha Lista de Desejos',
       CONSTRAINT fk_lista_usuario 
           FOREIGN KEY (id_usuario) REFERENCES usuario(id_pessoa) 
           ON DELETE CASCADE ON UPDATE CASCADE
   );

CREATE TABLE IF NOT EXISTS publicacao (
        id_publicacao SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR(150) NOT NULL,
        editora VARCHAR(150) NOT NULL,
        ano_publicacao INTEGER NOT NULL,
        edicao VARCHAR(50),
        numero_paginas INTEGER,
        genero VARCHAR(100),
        id_pessoa INTEGER NOT NULL,
        id_bibliotecario_cadastro INT,
        data_cadastro DATE DEFAULT CURRENT_DATE,
        FOREIGN KEY (id_pessoa) REFERENCES bibliotecario(id_pessoa)
    );

CREATE TABLE IF NOT EXISTS CONTEM (
    ID_Lista INTEGER NOT NULL,
    ID_Publicacao INTEGER NOT NULL,
    CONSTRAINT pk_contem PRIMARY KEY (ID_Lista, ID_Publicacao),
    CONSTRAINT fk_contem_lista 
      FOREIGN KEY (ID_Lista) 
      REFERENCES LISTA_DE_DESEJOS(id_usuario) 
      ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_contem_publicacao 
      FOREIGN KEY (ID_Publicacao) 
      REFERENCES PUBLICACAO(ID_Publicacao) 
      ON DELETE CASCADE ON UPDATE CASCADE
  );

CREATE TABLE IF NOT EXISTS DOACAO (
    ID_Doacao SERIAL PRIMARY KEY,
    ID_Doador INTEGER NOT NULL,
    Data_hora_doacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    Descricao TEXT,
    CONSTRAINT fk_doacao_doador
      FOREIGN KEY (ID_Doador) 
      REFERENCES DOADOR(ID_Doador)
      ON DELETE CASCADE ON UPDATE CASCADE
  );

CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS gerencia (
        id_pessoa INT NOT NULL,
        id_publicacao INT NOT NULL,
        data_verificacao DATE,
        observacao TEXT,
        descricao TEXT,
        PRIMARY KEY (id_pessoa, id_publicacao),
        FOREIGN KEY (id_pessoa) REFERENCES bibliotecario(id_pessoa) ON DELETE CASCADE,
        FOREIGN KEY (id_publicacao) REFERENCES publicacao(id_publicacao) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS exemplar (
    id_exemplar SERIAL PRIMARY KEY,
    id_publicacao INT NOT NULL,
    id_doacao INT,
    status VARCHAR(50) NOT NULL CHECK (status IN ('DISPONIVEL', 'EMPRESTADO', 'RESERVADO')),
    data_aquisicao DATE NOT NULL CHECK (data_aquisicao <= CURRENT_DATE),
    origem_publicacao VARCHAR(20) NOT NULL CHECK (
      origem_publicacao IN ('DOACAO', 'COMPRA', 'TRANSFERENCIA', 'OUTRA')
    ),
    FOREIGN KEY (id_publicacao) REFERENCES publicacao(id_publicacao)
      ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS versao_digital (
        id_versao_digital SERIAL PRIMARY KEY,
        id_exemplar INT NOT NULL UNIQUE,
        formato_arquivo VARCHAR(20),
        tamanho_arquivo NUMERIC(10, 2),
        url_acesso TEXT NOT NULL,
        FOREIGN KEY (id_exemplar) REFERENCES exemplar(id_exemplar) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS versao_fisica (
        id_versao_fisica SERIAL PRIMARY KEY,
        id_exemplar INT NOT NULL UNIQUE,
        estado_conservacao VARCHAR(50),
        tipo_capa VARCHAR(50),
        localizacao VARCHAR(100),
        FOREIGN KEY (id_exemplar) REFERENCES exemplar(id_exemplar) ON DELETE CASCADE
    );

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
`