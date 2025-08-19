import { Router, Request, Response } from "express";
import {
  createDoacao,
  getDoacaoById,
  getDoacoesByDoador,
} from "./doacao.controller";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await createDoacao(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getDoacaoById(req, res);
});

router.get("/doador/:doadorId", async (req: Request, res: Response) => {
  await getDoacoesByDoador(req, res);
});

export default router;
