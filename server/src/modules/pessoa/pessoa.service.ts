import { Pessoa, SELECT_PESSOA_BY_ID, DELETE_PESSOA, UPDATE_PESSOA} from "../../database/pessoa";
import {  executeQuerySingleResult, executeQueryNoReturn } from "../../database/queries";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";
import { PessoaUpdateDto } from "../auth/dto/PessoaCreateDto";
import { PessoaResponseDto } from "../auth/dto/PessoaResponseDto";
import { PessoaMapper } from "../auth/dto/mapper/PessoaMapper";




export class PessoaService {

  async getPessoaById(pessoaId: number){
    const pessoaDb = await executeQuerySingleResult<Pessoa>(SELECT_PESSOA_BY_ID,[pessoaId])

    if(!pessoaDb){
        throw new EntityNotFoundError("Pessoa", pessoaId)
    }

    const pessoaResponse: PessoaResponseDto = PessoaMapper.toResponseDto(pessoaDb);

    return pessoaResponse;
  }

  async updatePessoa(pessoaId: number, pessoaAtualizado: PessoaUpdateDto){
    const pessoaDb = await executeQuerySingleResult<Pessoa>(SELECT_PESSOA_BY_ID,[pessoaId]);

    if(!pessoaDb){
      throw new EntityNotFoundError("Pessoa", pessoaId)
    }

    const data = PessoaMapper.atualizarPessoa(pessoaDb, pessoaAtualizado)

    const pessoa = await executeQuerySingleResult <Pessoa>(UPDATE_PESSOA, [
        pessoaId,
        data.nome,
        data.data_de_nascimento,
        data.e_mail,
        data.cpf,
        data.senha,
        data.idDoador
    ]) as Pessoa;

    return PessoaMapper.toResponseDto(pessoa);

  }

  async deletePessoa(usuarioId: number){
    await this.getPessoaById(usuarioId);
    await executeQueryNoReturn(DELETE_PESSOA,[usuarioId]);
  }
}