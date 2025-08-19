import { z } from "zod";

export const VersaoDigitalCreateSchema = z.object({
  id_exemplar: z.number().int(),
  formato_arquivo: z.string().max(20),
  tamanho_arquivo: z.number().positive(),
  url_acesso: z.string().url(),
});

export const VersaoDigitalUpdateSchema = VersaoDigitalCreateSchema.partial();

export type VersaoDigitalCreateDto = z.infer<typeof VersaoDigitalCreateSchema>;
export type VersaoDigitalUpdateDto = z.infer<typeof VersaoDigitalUpdateSchema>;

export interface VersaoDigitalResponseDto {
  id_versao_digital: number;
  id_exemplar: number;
  formato_arquivo: string;
  tamanho_arquivo: number;
  url_acesso: string;
}
