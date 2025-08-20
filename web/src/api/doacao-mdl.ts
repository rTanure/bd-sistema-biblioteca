import { ModeloBase } from "./modelo-base";
import type {DoacaoResponseDto, DoacaoCreateDto} from "../../../server/src/modules/doacao/dto/DoacaoDto"

class DoacaoMdl extends ModeloBase<DoacaoResponseDto, DoacaoCreateDto ,object> {
  constructor() {
    super("/doacoes")
  }
}

export const doacaoMdl = new DoacaoMdl();