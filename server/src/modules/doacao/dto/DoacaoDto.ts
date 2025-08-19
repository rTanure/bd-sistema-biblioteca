import { z } from "zod";

export const DoacaoCreateSchema = z.object({
  doadorId: z.number().int().positive(),
  descricao: z.string().min(3)
});

export type DoacaoCreateDto = z.infer<typeof DoacaoCreateSchema>;

export interface DoacaoResponseDto {
  id: number;
  doadorId: number;
  dataHoraDoacao: Date;
  descricao: string;
}
