import { Secretario } from "../../../../database/secretario";
import { SecretarioUpdateDto} from "../SecretarioCreateDto";
import { SecretarioResponseDto } from "../SecretarioResponseDto";

export class SecretarioMapper {
  static toResponseDto(secretario: Secretario): SecretarioResponseDto {
    return {
      id_pessoa: secretario.id_pessoa,
      area_atuacao: secretario.area_atuacao,
      ramal_telefonico: secretario.ramal_telefonico,
      nivel_acesso_sistema: secretario.nivel_acesso_sistema,
    };
  }

  static atualizarSecretario(
    secretarioDb: Secretario,
    secretarioAtualizado: SecretarioUpdateDto
  ): Secretario {
    return {
      ...secretarioDb,
      ...secretarioAtualizado,
    };
  }
}
