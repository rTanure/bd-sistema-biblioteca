import { Router, Request, Response } from "express";
import {
  createBibliotecario,
  getBibliotecarioById,
  updateBibliotecario,
  deleteBibliotecario,
} from "./bibliotecario.controller";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await createBibliotecario(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getBibliotecarioById(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await updateBibliotecario(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteBibliotecario(req, res);
});

export default router;
