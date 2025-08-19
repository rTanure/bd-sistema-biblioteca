import {
  CREATE_VERSAO_FISICA,
  GET_VERSAO_FISICA_BY_ID,
  GET_ALL_VERSOES_FISICAS,
  UPDATE_VERSAO_FISICA,
  DELETE_VERSAO_FISICA,
  VersaoFisica
} from "../../database/versao_fisica";
import {
  VersaoFisicaCreateDto,
  VersaoFisicaUpdateDto,
  VersaoFisicaResponseDto
} from "./dto/VersaoFisicaDto";
import { VersaoFisicaMapper } from "./dto/mapper/VersaoFisicaMapper";
import {
  executeQuerySingleResult,
  executeQueryMultipleResults,
  executeQueryNoReturn
} from "../../database/queries";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class VersaoFisicaService {
  async create(data: VersaoFisicaCreateDto): Promise<VersaoFisicaResponseDto> {
    const vf = await executeQuerySingleResult<VersaoFisica>(CREATE_VERSAO_FISICA, [
      data.id_exemplar,
      data.estado_conservacao,
      data.tipo_capa,
      data.localizacao
    ]);
    if (!vf) throw new EntityCreationError("versao_fisica");
    return VersaoFisicaMapper.toResponseDto(vf);
  }

  async getById(id: number): Promise<VersaoFisicaResponseDto> {
    const vf = await executeQuerySingleResult<VersaoFisica>(GET_VERSAO_FISICA_BY_ID, [id]);
    if (!vf) throw new EntityNotFoundError("VersaoFisica", id);
    return VersaoFisicaMapper.toResponseDto(vf);
  }

  async getAll(): Promise<VersaoFisicaResponseDto[]> {
    const list = await executeQueryMultipleResults<VersaoFisica>(GET_ALL_VERSOES_FISICAS);
    return list.map(VersaoFisicaMapper.toResponseDto);
  }

  async update(id: number, data: VersaoFisicaUpdateDto): Promise<VersaoFisicaResponseDto> {
    const dbVf = await executeQuerySingleResult<VersaoFisica>(GET_VERSAO_FISICA_BY_ID, [id]);
    if (!dbVf) throw new EntityNotFoundError("VersaoFisica", id);

    const merged = VersaoFisicaMapper.atualizarVersaoFisica(dbVf, data);

    const vf = await executeQuerySingleResult<VersaoFisica>(UPDATE_VERSAO_FISICA, [
      id,
      merged.id_exemplar,
      merged.estado_conservacao,
      merged.tipo_capa,
      merged.localizacao
    ]);
    if (!vf) throw new EntityCreationError("versao_fisica");
    return VersaoFisicaMapper.toResponseDto(vf);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await executeQueryNoReturn(DELETE_VERSAO_FISICA, [id]);
  }
}
