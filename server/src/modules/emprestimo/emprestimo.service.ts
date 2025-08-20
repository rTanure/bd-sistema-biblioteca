import {
  executeQuerySingleResult,
  executeQueryMultipleResults,
  executeQueryNoReturn
} from "../../database/queries";
import {
  Emprestimo,
  INSERT_EMPRESTIMO,
  SELECT_EMPRESTIMO_BY_PK,
  SELECT_EMPRESTIMOS_ATIVOS_BY_USUARIO_ID,
  UPDATE_EMPRESTIMO_REGISTRAR_DEVOLUCAO
} from "../../database/emprestimo";

import { Exemplar, GET_EXEMPLAR_BY_ID, UPDATE_EXEMPLAR_STATUS } from "../../database/exemplar";
import { EmprestimoCreateDto, EmprestimoResponseDto, RegistrarDevolucaoDto } from './dto/EmprestimoDto';
import { EmprestimoMapper } from "./dto/mapper/EmprestimoMapper";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { BadRequestError } from "../../exception/BadRequestError";

export class EmprestimoService {
  async registrarEmprestimo(data: EmprestimoCreateDto): Promise<EmprestimoResponseDto> {

    const exemplar = await executeQuerySingleResult<Exemplar>(GET_EXEMPLAR_BY_ID,[data.exemplarId]);
    if(exemplar?.status === "EMPRESTADO"){
      throw new BadRequestError("Exemplar já está emprestado");
    }

    const emprestimo = await executeQuerySingleResult<Emprestimo>(INSERT_EMPRESTIMO, [
      data.usuarioId,
      data.exemplarId,
      data.dataPrevistaDevolucao,
      data.valorMulta
    ]);

    await executeQueryNoReturn(UPDATE_EXEMPLAR_STATUS,[data.exemplarId, 'EMPRESTADO'])

    if (!emprestimo) throw new EntityCreationError("emprestimo");
    return EmprestimoMapper.toResponseDto(emprestimo);
  }

  async registrarDevolucao(devolucao: RegistrarDevolucaoDto ){

    const exemplar = await executeQuerySingleResult<Exemplar>(GET_EXEMPLAR_BY_ID,[devolucao.exemplarId]);
    if(exemplar?.status === "DISPONIVEL"){
      throw new BadRequestError("Exemplar já foi devolvido");
    }
    
    await executeQueryNoReturn(UPDATE_EMPRESTIMO_REGISTRAR_DEVOLUCAO, [
      devolucao.usuarioId,
      devolucao.exemplarId,
      devolucao.valorMulta
    ]);
    await executeQueryNoReturn(UPDATE_EXEMPLAR_STATUS,[devolucao.exemplarId, 'DISPONIVEL'])
  }

  async getEmprestimosAtivosPorUsuario(usuarioId: number): Promise<EmprestimoResponseDto[]> {
    const emprestimos = await executeQueryMultipleResults<Emprestimo>(SELECT_EMPRESTIMOS_ATIVOS_BY_USUARIO_ID, [usuarioId]);
    return emprestimos.map(EmprestimoMapper.toResponseDto);
  }
}

