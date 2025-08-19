import { Contem } from "../../../../database/contem";
import { ContemResponseDto, PublicacaoDaListaResponseDto } from "../ContemResponseDto";

export class ContemMapper {
  static toResponseDto(contem: Contem): ContemResponseDto {
    return {
      listaDeDesejosId: contem.listaDeDesejosId,
      publicacaoId: contem.publicacaoId,
    };
  }

  static toPublicacaoDaListaDto(row: any): PublicacaoDaListaResponseDto {
    return {
      id: row.id,
      titulo: row.titulo,
    };
  }
}
