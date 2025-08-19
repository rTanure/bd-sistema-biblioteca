import { ModeloBase } from "./modelo-base";
import type {VersaoFisicaResponseDto, VersaoFisicaCreateDto, VersaoFisicaUpdateDto} from "../../../server/src/modules/versaoFisica/dto/VersaoFisicaDto"

class VersaoFisicaMdl extends ModeloBase<VersaoFisicaResponseDto, VersaoFisicaCreateDto, VersaoFisicaUpdateDto> {
  constructor() {
    super("/fisicas")
  }
}

export const versaoFisicaMdl = new VersaoFisicaMdl();