import { Router } from "express";
import {
  registrarEmprestimo,
  registrarDevolucao,
  getEmprestimosAtivosPorUsuario
} from "./emprestimo.controller";

const router = Router();

router.post("/", registrarEmprestimo);
router.put("/devolucao", registrarDevolucao);
router.get("/ativos/:usuarioId", getEmprestimosAtivosPorUsuario);

export default router;
