import { ModeloBase } from "./modelo-base";
import type {PublicacaoDaListaResponseDto} from "../../../server/src/modules/contem/dto/ContemResponseDto"
import type {AddPublicacaoNaListaDtoType} from "../../../server/src/modules/contem/dto/AddPublicacaoNaListaDto"

class ContemMdl extends ModeloBase<PublicacaoDaListaResponseDto, AddPublicacaoNaListaDtoType, object> {
  constructor() {
    super("/contem")
  }
}

export const contemMdl = new ContemMdl();