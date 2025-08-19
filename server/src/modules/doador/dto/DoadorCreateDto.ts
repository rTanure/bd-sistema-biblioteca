import { z } from "zod";

export const DoadorCreateSchema = z.object({
  tipoPessoa: z.enum(["PESSOA_FISICA", "PESSOA_JURIDICA"]),
  recebeInformativos: z.boolean().default(true),
});

export const DoadorUpdateSchema = z.object({
  recebeInformativos: z.boolean(),
});

export type DoadorCreateDto = z.infer<typeof DoadorCreateSchema>;
export type DoadorUpdateDto = z.infer<typeof DoadorUpdateSchema>;

export interface DoadorResponseDto {
  id: number;
  tipoPessoa: string;
  recebeInformativos: boolean;
}
