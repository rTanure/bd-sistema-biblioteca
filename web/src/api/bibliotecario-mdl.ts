import { ModeloBase } from "./modelo-base";
import type { BibliotecarioResponseDto } from "../../../server/src/modules/bibliotecario/dto/BibliotecarioResponseDto";
import type { BibliotecarioCreateDto, BibliotecarioUpdateDto } from "../../../server/src/modules/bibliotecario/dto/BibliotecarioCreateDto";

class BibliotecarioMdl extends ModeloBase<BibliotecarioResponseDto, BibliotecarioCreateDto, BibliotecarioUpdateDto> {
  constructor() {
    super("/bibliotecarios")
  }
}

export const bibliotecarioMdl = new BibliotecarioMdl();