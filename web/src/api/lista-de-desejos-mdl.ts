import { ModeloBase } from "./modelo-base";
import type {ListadedesejoCreateDto, ListadedesejoUpdateDto} from "../../../server/src/modules/listadedesejo/dto/ListadedesejosCreateDto";
import type {ListadedesejoResponseDto} from "../../../server/src/modules/listadedesejo/dto/ListadedesejoResponseDto";

class ListaDeDesejosMdl extends ModeloBase<ListadedesejoResponseDto, ListadedesejoCreateDto, ListadedesejoUpdateDto> {
  constructor() {
    super("/lista-de-desejos")
  }
}

export const listaDeDesejosMdl = new ListaDeDesejosMdl();