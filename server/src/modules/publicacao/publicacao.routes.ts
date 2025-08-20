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

// GET http://localhost:3000/publicacoes/search/titulo?titulo=Dom%20Casmurro
router.get("/search/titulo", searchPublicacoesByTitulo);

// GET http://localhost:3000/publicacoes/search/autor?autor=Machado%20de%20Assis
router.get("/search/autor", searchPublicacoesByAutor);

// GET http://localhost:3000/publicacoes/genero?genero=Romance
router.get("/search/genero", getPublicacoesByGenero);

//GET http://localhost:3000/publicacoes/ano?inicio=1900&fim=1950
router.get("/search/ano", getPublicacoesByAno);

export default router;