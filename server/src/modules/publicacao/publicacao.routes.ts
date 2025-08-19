import { Router } from "express";
import {
  createPublicacao,
  getPublicacaoById,
  getAllPublicacoes,
  updatePublicacao,
  deletePublicacao,
  searchPublicacoesByTitulo,
  searchPublicacoesByAutor,
  getPublicacoesByGenero,
  getPublicacoesByAno
} from "./publicacao.controller";

const router = Router();

router.post("/", createPublicacao);
router.get("/", getAllPublicacoes);
router.get("/:id", getPublicacaoById);
router.put("/:id", updatePublicacao);
router.delete("/:id", deletePublicacao);

// filtros / buscas
router.get("/search/titulo", searchPublicacoesByTitulo);
router.get("/search/autor", searchPublicacoesByAutor);
router.get("/search/genero", getPublicacoesByGenero);
router.get("/search/ano", getPublicacoesByAno);

export default router;