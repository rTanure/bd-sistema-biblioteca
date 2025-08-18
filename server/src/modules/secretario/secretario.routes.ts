import { Router, Request, Response } from "express";
import { createSecretario, getSecretarioById, updateSecretario, deleteSecretario } from "./secretario.controller";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await createSecretario(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getSecretarioById(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await updateSecretario(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteSecretario(req, res);
});

export default router;
