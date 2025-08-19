import { SecretarioResponseDto } from "./dto/SecretarioResponseDto";
import {SecretarioCreateDto, SecretarioUpdateDto} from "./dto/SecretarioCreateDto";
import { executeQuerySingleResult, executeQueryNoReturn } from "../../database/queries";
import { Secretario, INSERT_SECRETARIO, SELECT_SECRETARIO_BY_ID, DELETE_SECRETARIO, UPDATE_SECRETARIO } from "../../database/secretario";
import { SecretarioMapper } from "./dto/mapper/SecretarioMapper";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class SecretarioService {
  async createSecretario(secretario: SecretarioCreateDto): Promise<SecretarioResponseDto> {
    const secretarioDb = await executeQuerySingleResult<Secretario>(INSERT_SECRETARIO, [
        secretario.id_pessoa,
        secretario.area_atuacao,
        secretario.ramal_telefonico,
        secretario.nivel_acesso_sistema,
    ]);

    if (!secretarioDb) {
      throw new EntityCreationError("secretário");
    }

    return SecretarioMapper.toResponseDto(secretarioDb);
  }

  async getSecretarioById(id: number): Promise<SecretarioResponseDto> {
    const secretarioDb = await executeQuerySingleResult<Secretario>(SELECT_SECRETARIO_BY_ID, [id]);

    if (!secretarioDb) {
      throw new EntityNotFoundError("Secretário", id);
    }

    return SecretarioMapper.toResponseDto(secretarioDb);
  }

  async updateSecretario(id: number, secretarioAtualizado: SecretarioUpdateDto): Promise<SecretarioResponseDto> {
    const secretarioDb = await executeQuerySingleResult<Secretario>(SELECT_SECRETARIO_BY_ID, [id]);

    if (!secretarioDb) {
      throw new EntityNotFoundError("Secretário", id);
    }

    const data = SecretarioMapper.atualizarSecretario(secretarioDb, secretarioAtualizado);

    const secretario = await executeQuerySingleResult<Secretario>(UPDATE_SECRETARIO, [
      id,
      data.area_atuacao,
      data.ramal_telefonico,
      data.nivel_acesso_sistema,
    ]) as Secretario;

    return SecretarioMapper.toResponseDto(secretario);
  }

  async deleteSecretario(id: number): Promise<void> {
    await this.getSecretarioById(id);
    await executeQueryNoReturn(DELETE_SECRETARIO, [id]);
  }
}
