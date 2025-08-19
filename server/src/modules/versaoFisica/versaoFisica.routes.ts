import { Router, Request, Response } from "express";
import {
  createVersaoFisica,
  getVersaoFisicaById,
  getAllVersoesFisicas,
  updateVersaoFisica,
  deleteVersaoFisica
} from "./versaoFisica.controller";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await createVersaoFisica(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  await getAllVersoesFisicas(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getVersaoFisicaById(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await updateVersaoFisica(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteVersaoFisica(req, res);
});

export default router;
