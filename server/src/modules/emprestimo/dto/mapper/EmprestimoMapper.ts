import { Emprestimo } from "../../../../database/emprestimo";
import { EmprestimoResponseDto } from "../EmprestimoDto";

export class EmprestimoMapper {
  static toResponseDto(data: Emprestimo): EmprestimoResponseDto {
    return {
      usuarioId: data.usuarioId,
      publicacaoId: data.publicacaoId,
      dataEmprestimo: data.dataEmprestimo,
      dataPrevistaDevolucao: data.dataPrevistaDevolucao,
      dataRealDevolucao: data.dataRealDevolucao,
      status: data.status,
      valorMulta: data.valorMulta,
    };
  }
}
