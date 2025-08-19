import { z } from "zod";

export const ExemplarCreateSchema = z.object({
  id_publicacao: z.number().int(),
  id_doacao: z.number().int().optional(),
  status: z.enum(["DISPONIVEL", "EMPRESTADO", "RESERVADO"]),
  data_aquisicao: z.string().refine(date => new Date(date) <= new Date(), {
    message: "Data de aquisição não pode ser futura"
  }),
  origem_publicacao: z.enum(["DOACAO", "COMPRA", "TRANSFERENCIA", "OUTRA"]),
});

export const ExemplarUpdateSchema = ExemplarCreateSchema.partial();

export type ExemplarCreateDto = z.infer<typeof ExemplarCreateSchema>;
export type ExemplarUpdateDto = z.infer<typeof ExemplarUpdateSchema>;

export interface ExemplarResponseDto {
  id_exemplar: number;
  id_publicacao: number;
  id_doacao?: number;
  status: "DISPONIVEL" | "EMPRESTADO" | "RESERVADO";
  data_aquisicao: string;
  origem_publicacao: "DOACAO" | "COMPRA" | "TRANSFERENCIA" | "OUTRA";
}

export interface ExemplaresDisponiveisPorPublicacaoDto {
  id_publicacao: number;
  titulo: string;
  total_disponiveis: number;
}
