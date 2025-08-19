import { z } from "zod";

export const ListadedesejoCreateSchema = z.object({
  id_usuario: z.number(),
  nome_lista: z.string()
    .optional()

});

export const ListadedesejoUpdateSchema = z.object({
  nome_lista: z.string().min(2, "Nome da lista deve ter ao menos 2 caracteres").optional(),
});

export type ListadedesejoCreateDto = z.infer<typeof ListadedesejoCreateSchema >;
export type ListadedesejoUpdateDto = z.infer<typeof  ListadedesejoUpdateSchema>;
