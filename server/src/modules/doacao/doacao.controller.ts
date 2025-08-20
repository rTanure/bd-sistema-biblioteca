import { Request, Response } from "express";
import { DoacaoService } from "../doacao/doacao.service";
import { DoacaoCreateSchema } from "../doacao/dto/DoacaoDto";
import { validateSchema } from "../../utils/validateRequest";
import { number } from "zod/v4";

const service = new DoacaoService();

export async function createDoacao(req: Request, res: Response) {
  const doacaoData = validateSchema(DoacaoCreateSchema, req.body);
  const result = await service.createDoacao(doacaoData);
  return res.status(201).json(result);
}

export async function getDoacaoById(req: Request, res: Response) {
  const {id} = (req.params);
  const result = await service.getDoacaoById(Number(id));
  return res.status(200).json(result);
}

export async function getDoacoesByDoador(req: Request, res: Response) {
  const doadorId = Number(req.params);
  const results = await service.getDoacoesByDoadorId(doadorId);
  return res.status(200).json(results);
}
