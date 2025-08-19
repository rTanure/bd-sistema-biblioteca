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
import { EmprestimoCreateDto, EmprestimoResponseDto } from "./dto/EmprestimoDto";
import { EmprestimoMapper } from "./dto/mapper/EmprestimoMapper";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class EmprestimoService {
  async registrarEmprestimo(data: EmprestimoCreateDto): Promise<EmprestimoResponseDto> {
    const emprestimo = await executeQuerySingleResult<Emprestimo>(INSERT_EMPRESTIMO, [
      data.usuarioId,
      data.publicacaoId,
      data.dataPrevistaDevolucao,
      data.valorMulta
    ]);

    if (!emprestimo) throw new EntityCreationError("emprestimo");
    return EmprestimoMapper.toResponseDto(emprestimo);
  }

  async registrarDevolucao(usuarioId: number, publicacaoId: number, dataEmprestimo: Date, valorMulta: number): Promise<EmprestimoResponseDto> {
    await executeQueryNoReturn(UPDATE_EMPRESTIMO_REGISTRAR_DEVOLUCAO, [
      usuarioId,
      publicacaoId,
      dataEmprestimo,
      valorMulta
    ]);

    const emprestimo = await executeQuerySingleResult<Emprestimo>(SELECT_EMPRESTIMO_BY_PK, [
      usuarioId,
      publicacaoId,
      dataEmprestimo
    ]);

    if (!emprestimo) throw new EntityNotFoundError("Emprestimo", `${usuarioId}-${publicacaoId}-${dataEmprestimo}`);
    return EmprestimoMapper.toResponseDto(emprestimo);
  }

  async getEmprestimosAtivosPorUsuario(usuarioId: number): Promise<EmprestimoResponseDto[]> {
    const emprestimos = await executeQueryMultipleResults<Emprestimo>(SELECT_EMPRESTIMOS_ATIVOS_BY_USUARIO_ID, [usuarioId]);
    return emprestimos.map(EmprestimoMapper.toResponseDto);
  }
}
