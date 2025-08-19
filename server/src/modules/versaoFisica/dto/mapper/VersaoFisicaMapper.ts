import { VersaoFisica } from "../../../../database/versao_fisica";
import {
  VersaoFisicaResponseDto,
  VersaoFisicaUpdateDto
} from "../VersaoFisicaDto";

export class VersaoFisicaMapper {
  static toResponseDto(vf: VersaoFisica): VersaoFisicaResponseDto {
    return {
      id_versao_fisica: vf.id_versao_fisica,
      id_exemplar: vf.id_exemplar,
      estado_conservacao: vf.estado_conservacao,
      tipo_capa: vf.tipo_capa,
      localizacao: vf.localizacao,
    };
  }

  static atualizarVersaoFisica(db: VersaoFisica, updated: VersaoFisicaUpdateDto): VersaoFisica {
    return { ...db, ...updated };
  }
}