import { ModeloBase } from "./modelo-base";
import type { PublicacaoResponseDto} from "../../../server/src/modules/publicacao/dto/PublicacaoResponseDto";
import type { PublicacaoCreateDto, PublicacaoUpdateDto } from "../../../server/src/modules/publicacao/dto/PublicacaoCreateDto";

class PublicacaoMdl extends ModeloBase<PublicacaoResponseDto, PublicacaoCreateDto, PublicacaoUpdateDto> {
  constructor() {
    super("/publicacoes")
  }
}

export const publicacaoMdl = new PublicacaoMdl();