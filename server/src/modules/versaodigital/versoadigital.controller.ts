import { Request, Response } from "express";
import { VersaoDigitalService } from "./versaodigital.service";
import { VersaoDigitalCreateSchema, VersaoDigitalUpdateSchema } from "./dto/VersaoDigitalDto";

const service = new VersaoDigitalService();

export async function createVersaoDigital(req: Request, res: Response) {
  const parsed = VersaoDigitalCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const result = await service.create(parsed.data);
  return res.status(201).json(result);
}

export async function getVersaoDigitalById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = await service.getById(id);
  return res.status(200).json(result);
}

export async function getAllVersoesDigitais(req: Request, res: Response) {
  const result = await service.getAll();
  return res.status(200).json(result);
}

export async function updateVersaoDigital(req: Request, res: Response) {
  const id = Number(req.params.id);
  const parsed = VersaoDigitalUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const result = await service.update(id, parsed.data);
  return res.status(200).json(result);
}

export async function deleteVersaoDigital(req: Request, res: Response) {
  const id = Number(req.params.id);
  await service.delete(id);
  return res.status(204).send();
}
