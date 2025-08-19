import { z } from "zod";

export const OrgaoExternoCreateSchema = z.object({
  nomeOficial: z.string().min(1).max(255),
  cnpj: z.string().min(14).max(18),
  responsavel: z.string().min(1).max(255),
  email: z.string().email().max(255),
  telefone: z.string().min(8).max(20),
});

export const OrgaoExternoUpdateSchema = OrgaoExternoCreateSchema.partial();

export type OrgaoExternoCreateDto = z.infer<typeof OrgaoExternoCreateSchema>;
export type OrgaoExternoUpdateDto = z.infer<typeof OrgaoExternoUpdateSchema>;

export interface OrgaoExternoResponseDto {
  idOrgao: number;
  nomeOficial: string;
  cnpj: string;
  responsavel: string;
  email: string;
  telefone: string;
}
