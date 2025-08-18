import { z } from "zod";

export const BibliotecarioSchema = z.object({
  id_pessoa: z.number().int().positive(),
  area_especializacao: z.string().min(1, "Área de especialização é obrigatória"),
  crb_numero: z.string().min(1, "Número do CRB é obrigatório"),
  descricao_especializacao: z.string().min(1, "Descrição é obrigatória"),
});

export const BibliotecarioUpdateSchema = BibliotecarioSchema.partial();

export type BibliotecarioCreateDto = z.infer<typeof BibliotecarioSchema>;
export type BibliotecarioUpdateDto = z.infer<typeof BibliotecarioUpdateSchema>;
