import { FuncionarioCreateDto, FuncionarioResponseDto, FuncionarioUpdateDto  } from "./dto/FuncionarioCreateDto";
import { executeQueryNoReturn, executeQuerySingleResult } from "../../database/queries";
import { Funcionario, INSERT_FUNCIONARIO , SELECT_FUNCIONARIO_BY_ID, DELETE_FUNCIONARIO, UPDATE_FUNCIONARIO} from "../../database/funcionario";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { FuncionarioMapper } from "./dto/mapper/FuncionarioMapper";

export class FuncionarioService {

  async createFuncionario(funcionario: FuncionarioCreateDto): Promise<FuncionarioResponseDto> {
    const funcionarioDb = await executeQuerySingleResult<Funcionario>(INSERT_FUNCIONARIO, [funcionario.id_pessoa, funcionario.matricula, funcionario.data_admissao, funcionario.salario, funcionario.turno, funcionario.cargo]);

    if (!funcionarioDb) {
    throw new EntityCreationError('funcionario'); 
    }

    const funcionarioResponse = FuncionarioMapper.toResponseDto(funcionarioDb);
    return(funcionarioResponse)
  }

  async getFuncionarioById(funcionarioId: number){
    const funcionarioDb = await executeQuerySingleResult<Funcionario>(SELECT_FUNCIONARIO_BY_ID,[funcionarioId])

    if(!funcionarioDb){
        throw new EntityNotFoundError("Categoria", funcionarioId)
    }

    const funcionarioResponse: FuncionarioResponseDto = FuncionarioMapper.toResponseDto(funcionarioDb);

    return funcionarioResponse;
  }


  async updateFuncionario(funcionarioId: number, funcionarioAtualizado: FuncionarioUpdateDto){
    const funcionarioDb = await executeQuerySingleResult<Funcionario>(SELECT_FUNCIONARIO_BY_ID, [funcionarioId])

    if(!funcionarioDb){
      throw new EntityNotFoundError("Funacionário", funcionarioId)
    }

    const data = FuncionarioMapper.atualizarFuncionario(funcionarioDb, funcionarioAtualizado)
  
    const funcionario = await executeQuerySingleResult<Funcionario>(UPDATE_FUNCIONARIO,[
      data.id_pessoa,
      data.salario,
      data.turno
    ]) as Funcionario;

    const funcionarioResponse = FuncionarioMapper.toResponseDto(funcionario);

    return funcionarioResponse;
  }

  async deleteFuncionario(funcionarioId: number){
    await this.getFuncionarioById(funcionarioId);
    await executeQueryNoReturn(DELETE_FUNCIONARIO,[funcionarioId]);
  }
}