import { ModeloBase } from "./modelo-base";
import type { VersaoDigitalResponseDto, VersaoDigitalCreateDto, VersaoDigitalUpdateDto } from "../../../server/src/modules/versaodigital/dto/VersaoDigitalDto";

class VersaoDigitalMdl extends ModeloBase<VersaoDigitalResponseDto, VersaoDigitalCreateDto, VersaoDigitalUpdateDto> {
  constructor() {
    super("/digitais")
  }
}

export const versaoDigitalMdl = new VersaoDigitalMdl();