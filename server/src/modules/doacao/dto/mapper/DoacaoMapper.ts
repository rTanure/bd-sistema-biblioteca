import { Doacao } from "../../../../database/doacao";
import { DoacaoResponseDto } from "../DoacaoDto";

export class DoacaoMapper {
  static toResponseDto(doacao: Doacao): DoacaoResponseDto {
    return {
      id: doacao.id,
      doadorId: doacao.doadorId,
      dataHoraDoacao: doacao.dataHoraDoacao,
      descricao: doacao.descricao
    };
  }
}
