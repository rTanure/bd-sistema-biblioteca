import { z } from "zod";

export const StatusContaEnum = z.enum(["Ativo", "Inativo", "Suspenso", "Bloqueado"]);

export const UsuarioSchema = z.object({
  id_pessoa: z.number().int().positive(),     
  data_cadastro: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "data_cadastro deve estar no formato YYYY-MM-DD"
  }),
  status_conta: StatusContaEnum
});

export type UsuarioCreateDto = z.infer<typeof UsuarioSchema>;
export const UsuarioUpdateSchema = UsuarioSchema.partial();
export type UsuarioUpdateDto = z.infer<typeof UsuarioUpdateSchema>;