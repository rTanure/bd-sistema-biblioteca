import {
  INSERT_ORGAO_EXTERNO,
  SELECT_ORGAO_EXTERNO_BY_ID,
  UPDATE_ORGAO_EXTERNO,
  DELETE_ORGAO_EXTERNO,
  OrgaoExterno
} from "../../database/orgao_externo";
import {
  OrgaoExternoCreateDto,
  OrgaoExternoUpdateDto,
  OrgaoExternoResponseDto
} from "./dto/OrgaoexternoCreateDto"
import { OrgaoExternoMapper } from "./dto/mapper/OrgaoexternoMapper"
import {
  executeQuerySingleResult,
  executeQueryNoReturn
} from "../../database/queries";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class OrgaoExternoService {
  async create(data: OrgaoExternoCreateDto): Promise<OrgaoExternoResponseDto> {
    const orgao = await executeQuerySingleResult<OrgaoExterno>(INSERT_ORGAO_EXTERNO, [
      data.nomeOficial,
      data.cnpj,
      data.responsavel,
      data.email,
      data.telefone
    ]);
    if (!orgao) throw new EntityCreationError("orgao_externo");
    return OrgaoExternoMapper.toResponseDto(orgao);
  }

  async getById(id: number): Promise<OrgaoExternoResponseDto> {
    const orgao = await executeQuerySingleResult<OrgaoExterno>(SELECT_ORGAO_EXTERNO_BY_ID, [id]);
    if (!orgao) throw new EntityNotFoundError("OrgaoExterno", id);
    return OrgaoExternoMapper.toResponseDto(orgao);
  }

  async update(id: number, data: OrgaoExternoUpdateDto): Promise<OrgaoExternoResponseDto> {
    const dbOrgao = await executeQuerySingleResult<OrgaoExterno>(SELECT_ORGAO_EXTERNO_BY_ID, [id]);
    if (!dbOrgao) throw new EntityNotFoundError("OrgaoExterno", id);

    const merged = OrgaoExternoMapper.atualizarOrgao(dbOrgao, data);

    const orgao = await executeQuerySingleResult<OrgaoExterno>(UPDATE_ORGAO_EXTERNO, [
      id,
      merged.nomeOficial,
      merged.cnpj,
      merged.responsavel,
      merged.email,
      merged.telefone
    ]);
    
    if (!orgao) throw new EntityCreationError("orgao_externo");
    return OrgaoExternoMapper.toResponseDto(orgao);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await executeQueryNoReturn(DELETE_ORGAO_EXTERNO, [id]);
  }
}
