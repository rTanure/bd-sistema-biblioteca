import { z } from "zod";

export const EmprestimoCreateSchema = z.object({
  usuarioId: z.number().int(),
  publicacaoId: z.number().int(),
  dataPrevistaDevolucao: z.coerce.date(),
  valorMulta: z.number().nonnegative().default(0),
});

export type EmprestimoCreateDto = z.infer<typeof EmprestimoCreateSchema>;

export interface EmprestimoResponseDto {
  usuarioId: number;
  publicacaoId: number;
  dataEmprestimo: Date;
  dataPrevistaDevolucao: Date;
  dataRealDevolucao?: Date;
  status: 'ATIVO' | 'DEVOLVIDO' | 'ATRASADO';
  valorMulta: number;
}
