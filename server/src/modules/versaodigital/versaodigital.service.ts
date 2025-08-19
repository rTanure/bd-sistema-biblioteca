import {
  CREATE_VERSAO_DIGITAL,
  GET_VERSAO_DIGITAL_BY_ID,
  GET_ALL_VERSOES_DIGITAIS,
  UPDATE_VERSAO_DIGITAL,
  DELETE_VERSAO_DIGITAL,
  DETALHES_OBRA_DIGITAL,
  VersaoDigital 
} from "../../database/versao_digital"
import {
  VersaoDigitalCreateDto,
  VersaoDigitalUpdateDto,
  VersaoDigitalResponseDto,
} from "./dto/VersaoDigitalDto";
import { VersaoDigitalMapper } from "./dto/mapper/VersaodigitalMapper";
import {
  executeQuerySingleResult,
  executeQueryMultipleResults,
  executeQueryNoReturn,
} from "../../database/queries";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";
import { ObraDigitalDetalhesDto } from "./dto/ObraDigitalDetalhesDto";

export class VersaoDigitalService {
  async create(data: VersaoDigitalCreateDto): Promise<VersaoDigitalResponseDto> {
    const vd = await executeQuerySingleResult<VersaoDigital>(CREATE_VERSAO_DIGITAL, [
      data.id_exemplar,
      data.formato_arquivo,
      data.tamanho_arquivo,
      data.url_acesso,
    ]);
    if (!vd) throw new EntityCreationError("versao_digital");
    return VersaoDigitalMapper.toResponseDto(vd);
  }

  async getById(id: number): Promise<VersaoDigitalResponseDto> {
    const vd = await executeQuerySingleResult<VersaoDigital>(GET_VERSAO_DIGITAL_BY_ID, [id]);
    if (!vd) throw new EntityNotFoundError("VersaoDigital", id);
    return VersaoDigitalMapper.toResponseDto(vd);
  }

  async getAll(): Promise<VersaoDigitalResponseDto[]> {
    const list = await executeQueryMultipleResults<VersaoDigital>(GET_ALL_VERSOES_DIGITAIS);
    return list.map(VersaoDigitalMapper.toResponseDto);
  }

  async update(id: number, data: VersaoDigitalUpdateDto): Promise<VersaoDigitalResponseDto> {
    const dbVd = await executeQuerySingleResult<VersaoDigital>(GET_VERSAO_DIGITAL_BY_ID, [id]);
    if (!dbVd) throw new EntityNotFoundError("VersaoDigital", id);

    const merged = VersaoDigitalMapper.atualizarVersaoDigital(dbVd, data);

    const vd = await executeQuerySingleResult<VersaoDigital>(UPDATE_VERSAO_DIGITAL, [
      id,
      merged.id_exemplar,
      merged.formato_arquivo,
      merged.tamanho_arquivo,
      merged.url_acesso,
    ]);
    if (!vd) throw new EntityCreationError("versao_digital");
    return VersaoDigitalMapper.toResponseDto(vd);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await executeQueryNoReturn(DELETE_VERSAO_DIGITAL, [id]);
  }

    async getDetalhesObraDigital(id_versao_digital: number): Promise<ObraDigitalDetalhesDto> {
        const result = await executeQuerySingleResult<any>(DETALHES_OBRA_DIGITAL, [id_versao_digital]);
        if (!result) {
            throw new EntityNotFoundError("VersãoDigital", id_versao_digital);
        }
            
        return VersaoDigitalMapper.toDetalhesDto(result);
    }

}
