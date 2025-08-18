import { Pessoa } from "../../../../database/pessoa"
import { PessoaUpdateDto } from "../PessoaCreateDto"
import { PessoaResponseDto } from "../PessoaResponseDto"

export class PessoaMapper{
    static toResponseDto(pessoa: Pessoa): PessoaResponseDto{
       const dto: PessoaResponseDto= {
            id: pessoa.id,
            cpf: pessoa.cpf,
            nome: pessoa.nome,
            dataNascimento: pessoa.data_de_nascimento,
            e_mail: pessoa.e_mail,
            senha: pessoa.senha
        }
        return(dto)
    }

    static  atualizarPessoa(pessoaDb: Pessoa, pessoaAtualizada: PessoaUpdateDto){
            
        const pessoaAtualizado : Pessoa = {
            ...pessoaDb,
            ...pessoaAtualizada
        }
        return(pessoaAtualizado)
    }
}
