import { z } from "zod";
//  turno VARCHAR(20) CHECK (turno IN ('Manhã', 'Tarde', 'Noite', 'Integral')),
export const FuncionarioSchema = z.object({
  id_pessoa: z.number().int().positive(),
  matricula: z.string().min(3, "Matrícula deve ter pelo menos 3 caracteres"),
  data_admissao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "data_admissao deve estar no formato YYYY-MM-DD"
  }),
  salario: z.number().nonnegative(),
  turno: z.string().min(2, "Turno deve ter pelo menos 2 caracteres"),
  cargo: z.string().min(2, "Cargo deve ter pelo menos 2 caracteres")
});


export type FuncionarioCreateDto = z.infer<typeof FuncionarioSchema>;

export const FuncionarioUpdateSchema = FuncionarioSchema;
export type FuncionarioUpdateDto = z.infer<typeof FuncionarioUpdateSchema>;

export const FuncionarioResponseSchema = FuncionarioSchema;
export type FuncionarioResponseDto = z.infer<typeof FuncionarioResponseSchema>;
