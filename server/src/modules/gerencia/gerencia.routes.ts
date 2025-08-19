import { Router } from "express";
import {
  createGerencia,
  getGerenciaById,
  getAllGerencias,
  updateGerencia,
  deleteGerencia,
} from "./gerencia.controller";

const router = Router();

router.post("/", createGerencia);
router.get("/", getAllGerencias);
router.get("/:id_pessoa/:id_publicacao", getGerenciaById);
router.put("/:id_pessoa/:id_publicacao", updateGerencia);
router.delete("/:id_pessoa/:id_publicacao", deleteGerencia);

export default router;
