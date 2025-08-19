import { Gerencia } from "../../../../database/gerencia";
import { GerenciaResponseDto,GerenciaUpdateDto } from "../GerenciaDto";


export class GerenciaMapper {
  static toResponseDto(g: Gerencia): GerenciaResponseDto {
    return {
      id_pessoa: g.id_pessoa,
      id_publicacao: g.id_publicacao,
      data_verificacao: g.data_verificacao,
      observacao: g.observacao,
      descricao: g.descricao,
    };
  }

  static atualizarGerencia(db: Gerencia, updated: GerenciaUpdateDto): Gerencia {
    return { ...db, ...updated };
  }
}
