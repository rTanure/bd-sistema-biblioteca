import { Lista_de_desejos } from "../../../../database/lista_de_desejos";
import { ListadedesejoUpdateDto} from "../ListadedesejosCreateDto";
import { ListadedesejoResponseDto } from "../ListadedesejoResponseDto";

export class ListaDeDesejosMapper {
  static toResponseDto(lista: Lista_de_desejos): ListadedesejoResponseDto {
    return {
      id_usuario: lista.id_usuario,
      nome_lista: lista.nome_lista,
    };
  }

  static atualizarLista(
    listaDb: Lista_de_desejos,
    listaAtualizada: ListadedesejoUpdateDto
  ): Lista_de_desejos {
    return {
      ...listaDb,
      ...listaAtualizada,
    };
  }
}
