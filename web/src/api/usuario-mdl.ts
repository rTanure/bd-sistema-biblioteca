import { ModeloBase } from "./modelo-base";
import type { UsuarioCreateDto, UsuarioUpdateDto } from "../../../server/src/modules/usuario/dto/UsuarioCreateDto";
import type { UsuarioResponseDto } from "../../../server/src/modules/usuario/dto/UsuarioResponseDto";

class UsuarioMdl extends ModeloBase<UsuarioResponseDto, UsuarioCreateDto, UsuarioUpdateDto> {
  constructor() {
    super("/usuarios")
  }
}

export const usuarioMdl = new UsuarioMdl();