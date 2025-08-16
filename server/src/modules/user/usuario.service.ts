import { UsuarioResponseDto } from "./dto/UsuarioResponseDto";
import { UsuarioCreateDto, UsuarioUpdateDto } from './dto/UsuarioCreateDto';
import { executeQuerySingleResult, executeQueryNoReturn} from "../../database/queries";
import { Usuario, INSERT_USUARIO, SELECT_USUARIO_BY_ID, DELETE_USUARIO } from "../../database/usuario";
import { UsuarioMapper } from "./dto/mapper/UsuarioMapper";
import { EntityCreationError} from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";


export class UsuarioService {
  async createUser(usuario: UsuarioCreateDto): Promise<UsuarioResponseDto> {
    const usuarioDb = await executeQuerySingleResult<Usuario>(INSERT_USUARIO, [usuario.id_pessoa, usuario.data_cadastro, usuario.status_conta]);

    if (!usuarioDb) {
    throw new EntityCreationError('usuario'); 
    }

    const usuarioResponse = UsuarioMapper.toResponseDto(usuarioDb);
    return(usuarioResponse)
  }

  async getUsuarioById(usuarioId: number){
    const usuarioDb = await executeQuerySingleResult<Usuario>(SELECT_USUARIO_BY_ID,[usuarioId])

    if(!usuarioDb){
        throw new EntityNotFoundError("Categoria", usuarioId)
    }

    const categoryResponse: UsuarioResponseDto = UsuarioMapper.toResponseDto(usuarioDb);

    return categoryResponse;
  }

  async updateUsuario(usuarioId: number, usuarioAtualizado: UsuarioUpdateDto){
    await this.getUsuarioById(usuarioId);

    const udpated = UsuarioMapper.atualizarUsuario(usuarioAtualizado);
    const response = UsuarioMapper.toResponseDto(udpated);

    return response;
  }

  async deleteUsuario(usuarioId: number){
    await this.getUsuarioById(usuarioId);
    await executeQueryNoReturn(DELETE_USUARIO,[usuarioId]);
  }

}