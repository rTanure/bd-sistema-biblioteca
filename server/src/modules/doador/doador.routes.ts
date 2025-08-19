import { Router, Request, Response } from "express";
import {
  createDoador,
  getDoadorById,
  updateDoador,
  deleteDoador
} from "./doador.controller";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await createDoador(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getDoadorById(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await updateDoador(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteDoador(req, res);
});

export default router;
