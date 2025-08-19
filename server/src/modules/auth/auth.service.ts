import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from "../../exception/InvalidCredentialsError";
import { LoginResponseDto} from './dto/LoginResponseDto';
import { LoginDto } from './dto/LoginDto';
import { generateLoginResponse } from './utils/authUtils';
import { executeQuerySingleResult} from '../../database/queries';
import { Pessoa,INSERT_PESSOA, FIND_BY_EMAIL} from '../../database/pessoa';
import { PessoaCreateDto } from './dto/PessoaCreateDto';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioCreateDto } from '../usuario/dto/UsuarioCreateDto';

export class AuthService {
    usuarioService = new UsuarioService;

    async login(userInfo:LoginDto):Promise<LoginResponseDto> {
        const user = await executeQuerySingleResult<Pessoa>(FIND_BY_EMAIL, [userInfo.e_mail]);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const isMatch = await bcrypt.compare(userInfo.senha, user.senha);

        if (!isMatch) {
            throw new InvalidCredentialsError();
        }

        return generateLoginResponse(user);
    }

    async register(data: PessoaCreateDto): Promise<LoginResponseDto>{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.senha, salt);      
        data.senha = hashPassword;
        const user = await executeQuerySingleResult<Pessoa>(INSERT_PESSOA,[data.nome,data.dataNascimento,data.email, data.cpf, data.senha]);
        const response = generateLoginResponse(user)


        const createUserDto: UsuarioCreateDto = {
            id_pessoa: user!.id,    
            data_cadastro: new Date().toISOString().split("T")[0],
            status_conta: "Ativo"
        }

        this.usuarioService.createUser(createUserDto);

        return response;
    }
}