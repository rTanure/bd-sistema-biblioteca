import { z } from "zod";

export const PublicacaoCreateSchema = z.object({
  titulo: z.string().min(2, "Título é obrigatório"),
  autor: z.string().min(2, "Autor é obrigatório"),
  editora: z.string().min(2, "Editora é obrigatória"),
  ano_publicacao: z.number().int().gte(1000, "Ano inválido"),
  edicao: z.string().optional(),
  numero_paginas: z.number().int().positive("Número de páginas deve ser positivo").optional(),
  genero: z.string().optional(),
  id_pessoa: z.number().int(), // bibliotecário responsável
});

export const PublicacaoUpdateSchema = PublicacaoCreateSchema.partial();

export type PublicacaoCreateDto = z.infer<typeof PublicacaoCreateSchema>;
export type PublicacaoUpdateDto = z.infer<typeof PublicacaoUpdateSchema>;

