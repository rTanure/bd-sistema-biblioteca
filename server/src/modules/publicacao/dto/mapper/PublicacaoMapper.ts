import { Publicacao } from "../../../../database/publicacao";
import { PublicacaoResponseDto } from "../PublicacaoResponseDto";
import { PublicacaoUpdateDto } from "../PublicacaoCreateDto";

export class PublicacaoMapper {
  static toResponseDto(pub: Publicacao): PublicacaoResponseDto {
    return {
      id_publicacao: pub.id_publicacao,
      titulo: pub.titulo,
      autor: pub.autor,
      editora: pub.editora,
      ano_publicacao: pub.ano_publicacao,
      edicao: pub.edicao,
      numero_paginas: pub.numero_paginas,
      genero: pub.genero,
      id_pessoa: pub.id_pessoa,
    };
  }

  static atualizarPublicacao(db: Publicacao, updated: PublicacaoUpdateDto): Publicacao {
    return { ...db, ...updated};
  }
}
