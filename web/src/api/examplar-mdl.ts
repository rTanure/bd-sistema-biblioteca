import { ModeloBase } from "./modelo-base";
import type { ExemplarResponseDto, ExemplarCreateDto, ExemplarUpdateDto } from "../../../server/src/modules/exemplar/dto/ExemplarDto"


class ExemplarMdl extends ModeloBase<ExemplarResponseDto, ExemplarCreateDto, ExemplarUpdateDto> {
  constructor() {
    super("/exemplares")
  }
}

export const exemplarMdl = new ExemplarMdl();