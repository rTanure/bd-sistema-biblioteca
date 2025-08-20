import { ModeloBase } from "./modelo-base";
import type {GerenciaResponseDto, GerenciaCreateDto, GerenciaUpdateDto} from "../../../server/src/modules/gerencia/dto/GerenciaDto";

class GerenciaMdl extends ModeloBase<GerenciaResponseDto, GerenciaCreateDto, GerenciaUpdateDto> {
  constructor() {
    super("/gerencia")
  }
}

export const gerenciaMdl = new GerenciaMdl();