import { Router, Request, Response } from "express";
import {
  createVersaoDigital,
  getVersaoDigitalById,
  getAllVersoesDigitais,
  updateVersaoDigital,
  deleteVersaoDigital,
} from "./versoadigital.controller"

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await createVersaoDigital(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  await getAllVersoesDigitais(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getVersaoDigitalById(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await updateVersaoDigital(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteVersaoDigital(req, res);
});

export default router;
