import { z } from "zod";

export const EmprestimoCreateSchema = z.object({
  usuarioId: z.number().int(),
  exemplarId: z.number().int(),
  dataPrevistaDevolucao: z.coerce.date(),
  valorMulta: z.number().nonnegative().default(0),
});


export type EmprestimoCreateDto = z.infer<typeof EmprestimoCreateSchema>;

export interface EmprestimoResponseDto {
  usuarioId: number;
  exemplarId: number;
  dataEmprestimo: Date;
  dataPrevistaDevolucao: Date;
  dataRealDevolucao?: Date;
  status: 'ATIVO' | 'DEVOLVIDO' | 'ATRASADO';
  valorMulta: number;
}

export interface RegistrarDevolucaoDto {
  usuarioId: number;
  exemplarId: number;
  dataEmprestimo: string | Date;
  valorMulta: number;
}