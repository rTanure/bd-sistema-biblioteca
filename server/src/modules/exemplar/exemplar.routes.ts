import { Router, Request, Response } from "express";
import {
  createExemplar,
  getExemplarById,
  getAllExemplares,
  updateExemplar,
  deleteExemplar,
  searchExemplaresByStatus,
  getExemplaresByOrigem,
  getExemplaresByPublicacao,
  getExemplaresEmprestados,
  getExemplaresEmAtraso,
  getExemplaresDisponiveisPorPublicacao
} from "./exemplar.controller";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await createExemplar(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  await getAllExemplares(req, res);
});


router.get("/emprestados", async (req: Request, res: Response) => {
  await getExemplaresEmprestados(req, res);
});

router.get("/atrasados", async (req: Request, res: Response) => {
  await getExemplaresEmAtraso(req, res);
});

router.get("/disponiveis-por-publicacao", getExemplaresDisponiveisPorPublicacao);

//GET /exemplares/search/status?status=DISPONIVEL
router.get("/search/status", async (req: Request, res: Response) => {
  await searchExemplaresByStatus(req, res);
});

// GET /exemplares/search/origem?origem=DOACAO
router.get("/search/origem", async (req: Request, res: Response) => {
  await getExemplaresByOrigem(req, res);
});


router.get("/:id", async (req: Request, res: Response) => {
  await getExemplarById(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await updateExemplar(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteExemplar(req, res);
});

router.get("/publicacao/:id_publicacao", async (req: Request, res: Response) => {
  await getExemplaresByPublicacao(req, res);
});

export default router;
