import { Pessoa } from "../../../../database/pessoa"
import { PessoaResponseDto } from "../PessoaResponseDto"

export class PessoaMapper{
    static toResponseDto(pessoa: Pessoa): PessoaResponseDto{
       const dto: PessoaResponseDto= {
            id: pessoa.id,
            cpf: pessoa.cpf,
            nome: pessoa.nome,
            dataNascimento: pessoa.data_de_nascimento,
            email: pessoa.e_mail,
            senha: pessoa.senha
        }
        return(dto)
    }
}