import { ContemResponseDto, PublicacaoDaListaResponseDto } from "./dto/ContemResponseDto";
import { AddPublicacaoNaListaDtoType } from "./dto/AddPublicacaoNaListaDto";
import { executeQuerySingleResult,executeQueryMultipleResults, executeQueryNoReturn } from "../../database/queries";
import { ADD_PUBLICACAO_NA_LISTA, REMOVE_PUBLICACAO_DA_LISTA, SELECT_PUBLICACOES_DA_LISTA, VERIFY_PUBLICACAO_IN_LISTA , Contem} from "../../database/contem";
import { ContemMapper } from "./dto/mapper/ContemMapper";
import { EntityCreationError } from "../../exception/EntityCreationError";

export class ContemService {
  async addPublicacaoNaLista(data: AddPublicacaoNaListaDtoType): Promise<ContemResponseDto> {
    const contem = await executeQuerySingleResult<Contem>(ADD_PUBLICACAO_NA_LISTA, [
      data.listaDeDesejosId,
      data.publicacaoId,
    ]);

    if (!contem) {
      throw new EntityCreationError("contem");
    }

    return ContemMapper.toResponseDto(contem);
  }

  async removePublicacaoDaLista(listaId: number, publicacaoId: number): Promise<void> {
    await executeQueryNoReturn(REMOVE_PUBLICACAO_DA_LISTA, [listaId, publicacaoId]);
  }

  async listarPublicacoesDaLista(listaId: number): Promise<PublicacaoDaListaResponseDto[]> {
    const rows = await executeQueryMultipleResults(SELECT_PUBLICACOES_DA_LISTA, [listaId]);
    return rows.map((row: any) => ContemMapper.toPublicacaoDaListaDto(row));
  }

  async verificarSePublicacaoEstaNaLista(listaId: number, publicacaoId: number): Promise<boolean> {
    const result = await executeQuerySingleResult(VERIFY_PUBLICACAO_IN_LISTA, [listaId, publicacaoId]);
    return !!result;
  }
}
