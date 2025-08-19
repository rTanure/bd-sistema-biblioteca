import { z } from "zod";

export const VersaoFisicaCreateSchema = z.object({
  id_exemplar: z.number().int(),
  estado_conservacao: z.string().max(50),
  tipo_capa: z.string().max(50),
  localizacao: z.string().max(100),
});

export const VersaoFisicaUpdateSchema = VersaoFisicaCreateSchema.partial();

export type VersaoFisicaCreateDto = z.infer<typeof VersaoFisicaCreateSchema>;
export type VersaoFisicaUpdateDto = z.infer<typeof VersaoFisicaUpdateSchema>;

export interface VersaoFisicaResponseDto {
  id_versao_fisica: number;
  id_exemplar: number;
  estado_conservacao: string;
  tipo_capa: string;
  localizacao: string;
}
