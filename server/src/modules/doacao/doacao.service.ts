import { executeQuerySingleResult, executeQueryMultipleResults } from "../../database/queries";
import { Doacao, INSERT_DOACAO, SELECT_DOACAO_BY_ID, SELECT_DOACOES_BY_DOADOR_ID } from "../../database/doacao";
import { DoacaoCreateDto,DoacaoResponseDto } from "./dto/DoacaoDto";
import { DoacaoMapper } from "./dto/mapper/DoacaoMapper";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class DoacaoService {
  async createDoacao(data: DoacaoCreateDto): Promise<DoacaoResponseDto> {
    const result = await executeQuerySingleResult<Doacao>(INSERT_DOACAO, [data.doadorId, data.descricao]);
    if (!result) throw new EntityCreationError("doacao");
    return DoacaoMapper.toResponseDto(result);
  }

  async getDoacaoById(id: number): Promise<DoacaoResponseDto> {
    const result = await executeQuerySingleResult<Doacao>(SELECT_DOACAO_BY_ID, [id]);
    if (!result) throw new EntityNotFoundError("doacao", id);
    return DoacaoMapper.toResponseDto(result);
  }

  async getDoacoesByDoadorId(doadorId: number): Promise<DoacaoResponseDto[]> {
    const results = await executeQueryMultipleResults<Doacao>(SELECT_DOACOES_BY_DOADOR_ID, [doadorId]);
    return results.map(DoacaoMapper.toResponseDto);
  }
}
