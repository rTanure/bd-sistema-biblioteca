import {
  INSERT_DOADOR_PESSOA_FISICA,
  INSERT_DOADOR_ORGAO_EXTERNO,
  SELECT_DOADOR_BY_ID,
  UPDATE_DOADOR_INFO,
  DELETE_DOADOR,
  Doador,
  INSERT_DOADOR
} from "../../database/doador";
import {
  DoadorCreateDto,
  DoadorUpdateDto,
  DoadorResponseDto
} from "./dto/DoadorCreateDto";
import { DoadorMapper } from "./dto/mapper/DoadorMapper";
import {
  executeQuerySingleResult,
  executeQueryNoReturn
} from "../../database/queries";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class DoadorService {
  async create(data: DoadorCreateDto): Promise<DoadorResponseDto> {
    const doador = await executeQuerySingleResult<Doador>(INSERT_DOADOR, [
      data.tipoPessoa,
      data.recebeInformativos,
    ]);
    if (!doador) throw new EntityCreationError("doador");
    return DoadorMapper.toResponseDto(doador);
  }

  async getById(id: number): Promise<DoadorResponseDto> {
    const doador = await executeQuerySingleResult<Doador>(SELECT_DOADOR_BY_ID, [id]);
    if (!doador) throw new EntityNotFoundError("Doador", id);
    return DoadorMapper.toResponseDto(doador);
  }

  async update(id: number, data: DoadorUpdateDto): Promise<DoadorResponseDto> {
    const doador = await executeQuerySingleResult<Doador>(UPDATE_DOADOR_INFO, [
      id,
      data.recebeInformativos,
    ]);
    if (!doador) throw new EntityNotFoundError("Doador", id);
    return DoadorMapper.toResponseDto(doador);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await executeQueryNoReturn(DELETE_DOADOR, [id]);
  }
}
