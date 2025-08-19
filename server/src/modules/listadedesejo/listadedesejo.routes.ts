import { Router, Request, Response } from "express";
import { createLista, getListaById, updateLista, deleteLista } from "./listadedesejo.controller"

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await createLista(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getListaById(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await updateLista(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteLista(req, res);
});

export default router;
