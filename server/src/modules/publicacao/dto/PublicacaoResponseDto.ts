export interface PublicacaoResponseDto {
  id_publicacao: number;
  titulo: string;
  autor: string;
  editora: string;
  ano_publicacao: number;
  edicao?: string;
  numero_paginas?: number;
  genero?: string;
  id_pessoa: number;
}
