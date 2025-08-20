import { Request, Response } from "express";
import { VersaoFisicaService } from "./versaoFisica.service";
import {
  VersaoFisicaCreateSchema,
  VersaoFisicaUpdateSchema
} from "./dto/VersaoFisicaDto";
import { validateSchema } from "../../utils/validateRequest";

const service = new VersaoFisicaService();

export async function createVersaoFisica(req: Request, res: Response) {
  const parsed = validateSchema(VersaoFisicaCreateSchema, req.body);
  const result = await service.create(parsed);
  return res.status(201).json(result);
}

export async function getVersaoFisicaById(req: Request, res: Response) {
  const id = Number(req.params);
  const result = await service.getById(id);
  return res.status(200).json(result);
}

export async function getAllVersoesFisicas(req: Request, res: Response) {
  const result = await service.getAll();
  return res.status(200).json(result);
}

export async function updateVersaoFisica(req: Request, res: Response) {
  const id = Number(req.params);
  const parsed = validateSchema(VersaoFisicaUpdateSchema, req.body)

  const result = await service.update(id, parsed);
  return res.status(200).json(result);
}

export async function deleteVersaoFisica(req: Request, res: Response) {
  const id = Number(req.params);
  await service.delete(id);
  return res.status(204).send();
}
