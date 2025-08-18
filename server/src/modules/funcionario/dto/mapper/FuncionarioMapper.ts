import { Funcionario } from "../../../../database/funcionario"
import { FuncionarioResponseDto } from "../FuncionarioCreateDto"

export class FuncionarioMapper{
    static toResponseDto(funcionario: Funcionario): FuncionarioResponseDto{
       const dto: FuncionarioResponseDto = {
           id_pessoa: funcionario.id_pessoa,
           matricula: funcionario.matricula,
           data_admissao: funcionario.data_admissao,
           salario: funcionario.salario,
           turno: funcionario.turno,
           cargo: funcionario.cargo
        }
        return(dto)
    }
    
    static  atualizarFuncionario(funcionarioDb: Funcionario, funcionarioAtualizado: FuncionarioResponseDto){
            
        const response : Funcionario = {
            ...funcionarioDb,
            ...funcionarioAtualizado
        }
        return(response)
    }
}
