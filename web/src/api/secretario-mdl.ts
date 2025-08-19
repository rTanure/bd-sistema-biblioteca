import { ModeloBase } from "./modelo-base";
import type { SecretarioCreateDto, SecretarioUpdateDto} from "../../../server/src/modules/secretario/dto/SecretarioCreateDto"
import type { SecretarioResponseDto} from "../../../server/src/modules/secretario/dto/SecretarioResponseDto"


class SecretarioMdl extends ModeloBase<SecretarioResponseDto, SecretarioCreateDto, SecretarioUpdateDto> {
  constructor() {
    super("/secretarios")
  }
}

export const secretarioMdl = new SecretarioMdl();