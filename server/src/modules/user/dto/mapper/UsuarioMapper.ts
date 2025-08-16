import { Usuario } from '../../../../database/usuario';
import { UsuarioUpdateDto } from '../UsuarioCreateDto';
import { UsuarioResponseDto} from "../UsuarioResponseDto"

export class UsuarioMapper{
    static toResponseDto(usuario: Usuario): UsuarioResponseDto{
       const dto: UsuarioResponseDto = {
           id_pessoa: usuario.id_pessoa,
           id_leitor: usuario.id_leitor,
            data_cadastro: usuario.data_cadastro,
            status_conta: usuario.status_conta
        }
        return(dto)
    }

    static  atualizarUsuario(usuario: UsuarioUpdateDto){
        
        const usuarioAtualizado : Usuario = {
            id_pessoa: usuario.id_pessoa,
            id_leitor: usuario.id_pessoa,
            data_cadastro: usuario.data_cadastro,
            status_conta: usuario.status_conta
        }
        return(usuarioAtualizado)
    }



}

