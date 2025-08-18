import { z } from "zod";

export const PessoaCreateSchema = z.object({
  cpf: z
    .string()
    .length(11, "O CPF deve ter exatamente 11 dígitos") 
    .regex(/^\d+$/, "O CPF deve conter apenas números"),

  nome: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(255, "O nome deve ter no máximo 255 caracteres"),

  dataNascimento: z.coerce.date({
  required_error: "A data de nascimento é obrigatória",
  invalid_type_error: "Data de nascimento inválida",
}).refine(
  (date) => date <= new Date(),
  "A data de nascimento não pode ser no futuro"
),

  email: z
    .string()
    .email("E-mail inválido"),

  senha: z
    .string()
    .min(8, "A senha deve ter no mínimo 6 caracteres")
    .max(255, "A senha deve ter no máximo 255 caracteres"),
});

export const PessoaUpdateSchema = PessoaCreateSchema.partial();

export type PessoaCreateDto = z.infer<typeof PessoaCreateSchema>;
export type PessoaUpdateDto = z.infer<typeof PessoaUpdateSchema>;