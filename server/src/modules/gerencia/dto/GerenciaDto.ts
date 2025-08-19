import { z } from "zod";

export const GerenciaCreateSchema = z.object({
  id_pessoa: z.number().int().positive("id_pessoa inválido"),
  id_publicacao: z.number().int().positive("id_publicacao inválido"),
  data_verificacao: z.string().optional(), // pode vir do banco como DATE
  observacao: z.string().optional(),
  descricao: z.string().optional(),
});


export const GerenciaUpdateSchema = z.object({
  data_verificacao: z.string().optional(),
  observacao: z.string().optional(),
  descricao: z.string().optional(),
});

export type GerenciaCreateDto = z.infer<typeof GerenciaCreateSchema>;
export type GerenciaUpdateDto = z.infer<typeof GerenciaUpdateSchema>;

export interface GerenciaResponseDto {
  id_pessoa: number;
  id_publicacao: number;
  data_verificacao: string | null;
  observacao: string | null;
  descricao: string | null;
}
