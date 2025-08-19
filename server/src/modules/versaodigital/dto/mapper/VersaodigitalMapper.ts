import { VersaoDigital } from "../../../../database/versao_digital";
import { ObraDigitalDetalhesDto } from "../ObraDigitalDetalhesDto";
import {VersaoDigitalUpdateDto, VersaoDigitalResponseDto } from "../VersaoDigitalDto";

export class VersaoDigitalMapper {
  static toResponseDto(vd: VersaoDigital): VersaoDigitalResponseDto {
    return {
      id_versao_digital: vd.id_versao_digital,
      id_exemplar: vd.id_exemplar,
      formato_arquivo: vd.formato_arquivo,
      tamanho_arquivo: vd.tamanho_arquivo,
      url_acesso: vd.url_acesso,
    };
  }

  static atualizarVersaoDigital(db: VersaoDigital, updated: VersaoDigitalUpdateDto): VersaoDigital {
    return { ...db, ...updated };
  }
  static toDetalhesDto(result: any): ObraDigitalDetalhesDto {
    return {
      id_versao_digital: result.id_versao_digital,
      formato_arquivo: result.formato_arquivo,
      url_acesso: result.url_acesso,
      exemplar: {
        id_exemplar: result.id_exemplar,
        status: result.status,
        publicacao: {
          id_publicacao: result.id_publicacao,
          titulo: result.titulo,
          autor: result.autor,
          editora: result.editora,
          ano_publicacao: result.ano_publicacao,
        },
      },
    };
}
}
