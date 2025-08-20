import { ModeloBase } from "./modelo-base";
import type { EmprestimoResponseDto, EmprestimoCreateDto } from "../../../server/src/modules/emprestimo/dto/EmprestimoDto"

class EmprestimoMdl extends ModeloBase<EmprestimoResponseDto, EmprestimoCreateDto, object> {
  constructor() {
    super("/emprestimos")
  }
}

export const emprestimoMdl = new EmprestimoMdl();