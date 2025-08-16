import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from "../../exception/InvalidCredentialsError";
import { LoginResponseDto} from './dto/LoginResponseDto';
import { LoginDto } from './dto/LoginDto';
import { generateLoginResponse } from './utils/authUtils';
import { executeQuerySingleResult} from '../../database/queries';
import { Pessoa } from '../../database/pessoa';
import { PessoaCreateDto } from './dto/PessoaCreateDto';


const findUser= 'find entity'
const createPessoa= 'create pessoa'

export class AuthService {

    async login(userInfo:LoginDto):Promise<LoginResponseDto> {
        const user = await executeQuerySingleResult<Pessoa>(findUser);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.senha);

        if (!isMatch) {
            throw new InvalidCredentialsError();
        }

        return generateLoginResponse(user);
    }

    async register(data: PessoaCreateDto): Promise<LoginResponseDto>{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.senha, salt);      
        data.senha = hashPassword;
        const user = await executeQuerySingleResult<Pessoa>(createPessoa);
        const response = generateLoginResponse(user)
        return response;
    }
}