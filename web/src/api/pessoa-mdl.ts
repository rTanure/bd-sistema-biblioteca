import { ModeloBase } from "./modelo-base";
import type { Pessoa } from "../../../server/src/database/pessoa";
import type { PessoaUpdateDto } from "../../../server/src/modules/auth/dto/PessoaCreateDto";

class PessoaMdl extends ModeloBase<Pessoa, object, PessoaUpdateDto> {
  constructor() {
    super("/pessoas")
  }
}

export const pessoaMdl = new PessoaMdl();