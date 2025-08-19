import { Request, Response } from "express";
import { VersaoFisicaService } from "./versaoFisica.service";
import {
  VersaoFisicaCreateSchema,
  VersaoFisicaUpdateSchema
} from "./dto/VersaoFisicaDto";

const service = new VersaoFisicaService();

export async function createVersaoFisica(req: Request, res: Response) {
  const parsed = VersaoFisicaCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const result = await service.create(parsed.data);
  return res.status(201).json(result);
}

export async function getVersaoFisicaById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = await service.getById(id);
  return res.status(200).json(result);
}

export async function getAllVersoesFisicas(req: Request, res: Response) {
  const result = await service.getAll();
  return res.status(200).json(result);
}

export async function updateVersaoFisica(req: Request, res: Response) {
  const id = Number(req.params.id);
  const parsed = VersaoFisicaUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const result = await service.update(id, parsed.data);
  return res.status(200).json(result);
}

export async function deleteVersaoFisica(req: Request, res: Response) {
  const id = Number(req.params.id);
  await service.delete(id);
  return res.status(204).send();
}
