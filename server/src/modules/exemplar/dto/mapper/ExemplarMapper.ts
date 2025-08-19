import { Exemplar } from "../../../../database/exemplar";
import {  ExemplarResponseDto, ExemplarUpdateDto } from "../ExemplarDto";

export class ExemplarMapper {
  static toResponseDto(ex: Exemplar): ExemplarResponseDto {
    return {
      id_exemplar: ex.id_exemplar,
      id_publicacao: ex.id_publicacao,
      id_doacao: ex.id_doacao,
      status: ex.status,
      data_aquisicao: ex.data_aquisicao,
      origem_publicacao: ex.origem_publicacao,
    };
  }

  static atualizarExemplar(db: Exemplar, updated: ExemplarUpdateDto): Exemplar {
    return { ...db, ...updated };
  }
}
