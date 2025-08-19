import { Router } from "express";
import { addPublicacaoNaLista, removePublicacaoDaLista, listarPublicacoesDaLista, verificarSePublicacaoEstaNaLista } from "./contem.controller";

const router = Router();

router.post("/", addPublicacaoNaLista);

router.get("/:listaId", listarPublicacoesDaLista);

router.get("/:listaId/publicacao/:publicacaoId", verificarSePublicacaoEstaNaLista);

router.delete("/:listaId/publicacao/:publicacaoId", removePublicacaoDaLista);

export default router;
