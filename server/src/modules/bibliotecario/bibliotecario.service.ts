import {
  INSERT_BIBLIOTECARIO,
  SELECT_BIBLIOTECARIO_BY_ID,
  UPDATE_BIBLIOTECARIO,
  DELETE_BIBLIOTECARIO,
  Bibliotecario,
} from "../../database/bibliotecario";

import {
  executeQuerySingleResult,
  executeQueryNoReturn,
} from "../../database/queries";

import { BibliotecarioMapper } from "./dto/mapper/BibliotecarioMapper";
import {
  BibliotecarioCreateDto,
  BibliotecarioUpdateDto,
} from "./dto/BibliotecarioCreateDto";
import { BibliotecarioResponseDto } from "./dto/BibliotecarioResponseDto";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class BibliotecarioService {
  async createBibliotecario(
    data: BibliotecarioCreateDto
  ): Promise<BibliotecarioResponseDto> {
    const bibDb = await executeQuerySingleResult<Bibliotecario>(
      INSERT_BIBLIOTECARIO,
      [data.area_especializacao, data.crb_numero, data.descricao_especializacao]
    );

    if (!bibDb) {
      throw new EntityCreationError("bibliotecario");
    }

    return BibliotecarioMapper.toResponseDto(bibDb);
  }

  async getBibliotecarioById(id: number): Promise<BibliotecarioResponseDto> {

    const bibDb = await executeQuerySingleResult<Bibliotecario>(
      SELECT_BIBLIOTECARIO_BY_ID,
      [id]
    );

    if (!bibDb) {
      throw new EntityNotFoundError("Bibliotecario", id);
    }

    return BibliotecarioMapper.toResponseDto(bibDb);
  }

  async updateBibliotecario(
    id: number,
    data: BibliotecarioUpdateDto
  ): Promise<BibliotecarioResponseDto> {

    const bibExistente = await executeQuerySingleResult<Bibliotecario>(SELECT_BIBLIOTECARIO_BY_ID,[id]);

    if(!bibExistente){
        throw new EntityNotFoundError("Bibliotecario", id);
    }

    const atualizado = BibliotecarioMapper.atualizarBibliotecario(
      bibExistente,
      data
    );

    const bibDb = await executeQuerySingleResult<Bibliotecario>(
      UPDATE_BIBLIOTECARIO,
      [id, atualizado.area_especializacao, atualizado.crb_numero, atualizado.descricao_especializacao]
    ) as Bibliotecario;

    return BibliotecarioMapper.toResponseDto(bibDb);
  }

  async deleteBibliotecario(id: number): Promise<void> {
    await this.getBibliotecarioById(id);
    await executeQueryNoReturn(DELETE_BIBLIOTECARIO, [id]);
  }
}
