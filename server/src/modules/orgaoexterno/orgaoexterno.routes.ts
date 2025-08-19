import { Router, Request, Response } from "express";
import {
  createOrgaoExterno,
  getOrgaoExternoById,
  updateOrgaoExterno,
  deleteOrgaoExterno
} from "./orgaoexterno.controller";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await createOrgaoExterno(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getOrgaoExternoById(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await updateOrgaoExterno(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteOrgaoExterno(req, res);
});

export default router;
