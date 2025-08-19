import { Request, Response } from "express";
import { DoacaoService } from "../doacao/doacao.service";
import { DoacaoCreateSchema } from "../doacao/dto/DoacaoDto";
import { validateSchema } from "../../utils/validateRequest";

const service = new DoacaoService();

export async function createDoacao(req: Request, res: Response) {
  const doacaoData = validateSchema(DoacaoCreateSchema, req.body);
  const result = await service.createDoacao(doacaoData);
  return res.status(201).json(result);
}

export async function getDoacaoById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = await service.getDoacaoById(id);
  return res.status(200).json(result);
}

export async function getDoacoesByDoador(req: Request, res: Response) {
  const doadorId = Number(req.params.doadorId);
  const results = await service.getDoacoesByDoadorId(doadorId);
  return res.status(200).json(results);
}
