import { ListadedesejoResponseDto } from "./dto/ListadedesejoResponseDto";
import { ListadedesejoCreateDto, ListadedesejoUpdateDto } from "./dto/ListadedesejosCreateDto";
import { executeQuerySingleResult, executeQueryNoReturn } from "../../database/queries";
import { Lista_de_desejos, INSERT_LISTA, SELECT_LISTA_BY_ID, DELETE_LISTA, UPDATE_LISTA } from "../../database/lista_de_desejos";
import { ListaDeDesejosMapper } from "./dto/mapper/ListadedesejoMappper";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class ListaDeDesejosService {
  async createLista(lista: ListadedesejoCreateDto): Promise<ListadedesejoResponseDto> {
    const listaDb = await executeQuerySingleResult<Lista_de_desejos>(INSERT_LISTA, [
      lista.id_usuario,
      lista.nome_lista,
    ]);

    if (!listaDb) {
      throw new EntityCreationError("lista de desejos");
    }

    return ListaDeDesejosMapper.toResponseDto(listaDb);
  }

  async getListaById(id: number): Promise<ListadedesejoResponseDto> {
    const listaDb = await executeQuerySingleResult<Lista_de_desejos>(SELECT_LISTA_BY_ID, [id]);

    if (!listaDb) {
      throw new EntityNotFoundError("Lista de Desejos", id);
    }

    return ListaDeDesejosMapper.toResponseDto(listaDb);
  }

  async updateLista(id: number, listaAtualizada: ListadedesejoUpdateDto): Promise<ListadedesejoResponseDto> {
    const listaDb = await executeQuerySingleResult<Lista_de_desejos>(SELECT_LISTA_BY_ID, [id]);

    if (!listaDb) {
      throw new EntityNotFoundError("Lista de Desejos", id);
    }

    const data = ListaDeDesejosMapper.atualizarLista(listaDb, listaAtualizada);

    const lista = await executeQuerySingleResult<Lista_de_desejos>(UPDATE_LISTA, [
      id,
      data.nome_lista,
    ]) as Lista_de_desejos;

    return ListaDeDesejosMapper.toResponseDto(lista);
  }

  async deleteLista(id: number): Promise<void> {
    await this.getListaById(id);
    await executeQueryNoReturn(DELETE_LISTA, [id]);
  }
}
