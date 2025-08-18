import { z } from "zod";

export const SecretarioCreateSchema = z.object({
  id_pessoa: z.number({
    required_error: "O campo 'id_pessoa' é obrigatório",
    invalid_type_error: "O campo 'id_pessoa' deve ser um número",
  }),
  area_atuacao: z.string().min(2, "Área de atuação deve ter ao menos 2 caracteres"),
  ramal_telefonico: z.string().min(3, "Ramal telefônico inválido"),
  nivel_acesso_sistema: z.string().min(3, "Nível de acesso inválido"),
});

export const SecretarioUpdateSchema = SecretarioCreateSchema.partial();


export type SecretarioCreateDto = z.infer<typeof SecretarioCreateSchema>;
export type SecretarioUpdateDto = z.infer<typeof SecretarioUpdateSchema>;
