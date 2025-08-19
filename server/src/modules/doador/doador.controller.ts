import { Request, Response } from "express";
import { DoadorService } from "./doador.service";
import {
  DoadorCreateSchema,
  DoadorUpdateSchema
} from "./dto/DoadorCreateDto";

const service = new DoadorService();

export async function createDoador(req: Request, res: Response) {
  const parsed = DoadorCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const result = await service.create(parsed.data);
  return res.status(201).json(result);
}

export async function getDoadorById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = await service.getById(id);
  return res.status(200).json(result);
}

export async function updateDoador(req: Request, res: Response) {
  const id = Number(req.params.id);
  const parsed = DoadorUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const result = await service.update(id, parsed.data);
  return res.status(200).json(result);
}

export async function deleteDoador(req: Request, res: Response) {
  const id = Number(req.params.id);
  await service.delete(id);
  return res.status(204).send();
}
