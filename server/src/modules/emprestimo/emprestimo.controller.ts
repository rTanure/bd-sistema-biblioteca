import { Request, Response } from "express";
import { EmprestimoService } from "./emprestimo.service";
import { validateSchema } from "../../utils/validateRequest";
import { EmprestimoCreateSchema } from "./dto/EmprestimoDto";

const service = new EmprestimoService();

export async function registrarEmprestimo(req: Request, res: Response) {
  const data = validateSchema(EmprestimoCreateSchema, req.body);

  const emprestimo = await service.registrarEmprestimo({
    ...data,
    valorMulta: data.valorMulta ?? 0,
  });

  return res.status(201).json(emprestimo);
}

export async function registrarDevolucao(req: Request, res: Response) {
  const devolucao = req.body;
  await service.registrarDevolucao(devolucao);
  return res.status(204).send();
}

export async function getEmprestimosAtivosPorUsuario(req: Request, res: Response) {
  const { usuarioId } = req.params;
  const emprestimos = await service.getEmprestimosAtivosPorUsuario(Number(usuarioId));
  return res.status(200).json(emprestimos);
}
