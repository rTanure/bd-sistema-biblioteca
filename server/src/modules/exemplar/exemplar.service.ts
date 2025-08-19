import {
    CREATE_EXEMPLAR,
    GET_EXEMPLAR_BY_ID,
    GET_ALL_EXEMPLARES,
    UPDATE_EXEMPLAR,
    DELETE_EXEMPLAR,
    SEARCH_EXEMPLARES_BY_STATUS,
    GET_EXEMPLARES_BY_ORIGEM,
    GET_EXEMPLARES_BY_PUBLICACAO,
    GET_EXEMPLARES_EMPRESTADOS,
    GET_EXEMPLARES_EM_ATRASO,
    GET_EXEMPLARES_DISPONIVEIS_POR_PUBLICACAO,
    Exemplar 
} from "../../database/exemplar";
import {
  ExemplarCreateDto,
  ExemplarUpdateDto,
  ExemplarResponseDto,
  ExemplaresDisponiveisPorPublicacaoDto
} from "./dto/ExemplarDto";
import { ExemplarMapper } from "./dto/mapper/ExemplarMapper";
import {
  executeQuerySingleResult,
  executeQueryMultipleResults,
  executeQueryNoReturn,
} from "../../database/queries";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class ExemplarService {
  async create(data: ExemplarCreateDto): Promise<ExemplarResponseDto> {
    const ex = await executeQuerySingleResult<Exemplar>(CREATE_EXEMPLAR, [
      data.id_publicacao,
      data.id_doacao ?? null,
      data.status,
      data.data_aquisicao,
      data.origem_publicacao,
    ]);
    if (!ex) throw new EntityCreationError("exemplar");
    return ExemplarMapper.toResponseDto(ex);
  }

  async getById(id: number): Promise<ExemplarResponseDto> {
    const ex = await executeQuerySingleResult<Exemplar>(GET_EXEMPLAR_BY_ID, [id]);
    if (!ex) throw new EntityNotFoundError("Exemplar", id);
    return ExemplarMapper.toResponseDto(ex);
  }

  async getAll(): Promise<ExemplarResponseDto[]> {
    const list = await executeQueryMultipleResults<Exemplar>(GET_ALL_EXEMPLARES);
    return list.map(ExemplarMapper.toResponseDto);
  }

  async update(id: number, data: ExemplarUpdateDto): Promise<ExemplarResponseDto> {
    const dbEx = await executeQuerySingleResult<Exemplar>(GET_EXEMPLAR_BY_ID, [id]);
    if (!dbEx) throw new EntityNotFoundError("Exemplar", id);

    const merged = ExemplarMapper.atualizarExemplar(dbEx, data);

    const ex = await executeQuerySingleResult<Exemplar>(UPDATE_EXEMPLAR, [
      id,
      merged.id_publicacao,
      merged.id_doacao ?? null,
      merged.status,
      merged.data_aquisicao,
      merged.origem_publicacao,
    ]);
    if (!ex) throw new EntityCreationError("exemplar");
    return ExemplarMapper.toResponseDto(ex);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await executeQueryNoReturn(DELETE_EXEMPLAR, [id]);
  }

  async searchByStatus(status: string): Promise<ExemplarResponseDto[]> {
    const list = await executeQueryMultipleResults<Exemplar>(SEARCH_EXEMPLARES_BY_STATUS, [status]);
    return list.map(ExemplarMapper.toResponseDto);
  }

  async getByOrigem(origem: string): Promise<ExemplarResponseDto[]> {
    const list = await executeQueryMultipleResults<Exemplar>(GET_EXEMPLARES_BY_ORIGEM, [origem]);
    return list.map(ExemplarMapper.toResponseDto);
  }

  async getByPublicacao(id_publicacao: number): Promise<ExemplarResponseDto[]> {
    const list = await executeQueryMultipleResults<Exemplar>(GET_EXEMPLARES_BY_PUBLICACAO, [id_publicacao]);
    return list.map(ExemplarMapper.toResponseDto);
  }
  
   async getEmprestados(): Promise<ExemplarResponseDto[]> {
    const list = await executeQueryMultipleResults<Exemplar>(GET_EXEMPLARES_EMPRESTADOS);
    return list.map(ExemplarMapper.toResponseDto);
  }

  async getEmAtraso(): Promise<ExemplarResponseDto[]> {
    const list = await executeQueryMultipleResults<Exemplar>(GET_EXEMPLARES_EM_ATRASO);
    return list.map(ExemplarMapper.toResponseDto);
  }

  async getDisponiveisPorPublicacao(): Promise<ExemplaresDisponiveisPorPublicacaoDto[]> {
    return await executeQueryMultipleResults<ExemplaresDisponiveisPorPublicacaoDto>(
      GET_EXEMPLARES_DISPONIVEIS_POR_PUBLICACAO
    );
  }
}