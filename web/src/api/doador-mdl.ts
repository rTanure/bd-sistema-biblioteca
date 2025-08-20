import { ModeloBase } from "./modelo-base";
import type { DoadorResponseDto, DoadorCreateDto, DoadorUpdateDto } from "../../../server/src/modules/doador/dto/DoadorCreateDto";


class DoadorMdl extends ModeloBase<DoadorResponseDto, DoadorCreateDto ,DoadorUpdateDto> {
  constructor() {
    super("/doadores")
  }
}

export const doadorMdl = new DoadorMdl();