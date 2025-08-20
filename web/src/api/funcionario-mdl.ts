import { ModeloBase } from "./modelo-base";
import type {FuncionarioResponseDto, FuncionarioCreateDto, FuncionarioUpdateDto} from "../../../server/src/modules/funcionario/dto/FuncionarioCreateDto";

class FuncionarioMdl extends ModeloBase<FuncionarioResponseDto, FuncionarioCreateDto, FuncionarioUpdateDto> {
  constructor() {
    super("/funcionarios")
  }
}

export const funcionarioMdl = new FuncionarioMdl();