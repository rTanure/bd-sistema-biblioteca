import { z } from "zod";

export const AddPublicacaoNaListaDto = z.object({
  listaDeDesejosId: z.number({
    required_error: "O campo 'listaDeDesejosId' é obrigatório",
    invalid_type_error: "O campo 'listaDeDesejosId' deve ser um número",
  }),
  publicacaoId: z.number({
    required_error: "O campo 'publicacaoId' é obrigatório",
    invalid_type_error: "O campo 'publicacaoId' deve ser um número",
  }),
});

export type AddPublicacaoNaListaDtoType = z.infer<typeof AddPublicacaoNaListaDto>;
