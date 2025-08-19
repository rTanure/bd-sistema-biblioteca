import { 
  CREATE_GERENCIA, GET_GERENCIA_BY_ID, GET_ALL_GERENCIA, 
  UPDATE_GERENCIA, DELETE_GERENCIA, Gerencia 
} from "../../database/gerencia";
import {executeQueryMultipleResults, executeQuerySingleResult, executeQueryNoReturn } from "../../database/queries";
import { GerenciaCreateDto, GerenciaResponseDto, GerenciaUpdateDto } from "./dto/GerenciaDto";
import { GerenciaMapper } from "./dto/mapper/GerenciaMapper";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class GerenciaService {
  async createGerencia(data: GerenciaCreateDto): Promise<GerenciaResponseDto> {
    const result = await executeQuerySingleResult<Gerencia>(CREATE_GERENCIA, [
      data.id_pessoa,
      data.id_publicacao,
      data.data_verificacao ?? new Date().toISOString().split("T")[0],
      data.observacao ?? null,
      data.descricao ?? null,
    ]);

    if (!result) throw new EntityCreationError("Gerencia");
    return GerenciaMapper.toResponseDto(result);
  }

  async getGerenciaById(id_pessoa: number, id_publicacao: number): Promise<GerenciaResponseDto> {
    const result = await executeQuerySingleResult<Gerencia>(GET_GERENCIA_BY_ID, [id_pessoa, id_publicacao]);
    if (!result) throw new EntityNotFoundError("Gerencia", `${id_pessoa}-${id_publicacao}`);
    return GerenciaMapper.toResponseDto(result);
  }

  async getAllGerencias(): Promise<GerenciaResponseDto[]> {
    const results = await executeQueryMultipleResults<Gerencia>(GET_ALL_GERENCIA);
    return results.map(GerenciaMapper.toResponseDto);
  }

  async updateGerencia(id_pessoa: number, id_publicacao: number, data: GerenciaUpdateDto): Promise<GerenciaResponseDto> {
    const dbGerencia = await executeQuerySingleResult<Gerencia>(GET_GERENCIA_BY_ID, [id_pessoa, id_publicacao]);
    if (!dbGerencia) throw new EntityNotFoundError("Gerencia", `${id_pessoa}-${id_publicacao}`);

    const merged = GerenciaMapper.atualizarGerencia(dbGerencia, data);

    const result = await executeQuerySingleResult<Gerencia>(UPDATE_GERENCIA, [
      id_pessoa,
      id_publicacao,
      merged.data_verificacao ?? new Date().toISOString().split("T")[0],
      merged.observacao,
      merged.descricao,
    ]);

    if (!result) throw new EntityCreationError("Gerencia");
    return GerenciaMapper.toResponseDto(result);
  }

  async deleteGerencia(id_pessoa: number, id_publicacao: number): Promise<void> {
    await this.getGerenciaById(id_pessoa, id_publicacao);
    await executeQueryNoReturn(DELETE_GERENCIA, [id_pessoa, id_publicacao]);
  }
}
