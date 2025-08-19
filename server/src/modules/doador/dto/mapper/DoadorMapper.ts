import { Doador } from "../../../../database/doador";
import { DoadorResponseDto } from "../DoadorCreateDto"

export class DoadorMapper {
  static toResponseDto(doador: Doador): DoadorResponseDto {
    return {
      id: doador.id,
      tipoPessoa: doador.tipoPessoa,
      recebeInformativos: doador.recebeInformativos,
    };
  }
}
