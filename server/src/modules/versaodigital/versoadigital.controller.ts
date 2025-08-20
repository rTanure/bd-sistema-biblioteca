import { Request, Response } from "express";
import { VersaoDigitalService } from "./versaodigital.service";
import { VersaoDigitalCreateSchema, VersaoDigitalUpdateSchema } from "./dto/VersaoDigitalDto";
import { validateSchema } from "../../utils/validateRequest";

const service = new VersaoDigitalService();

export async function createVersaoDigital(req: Request, res: Response) {
  const parsed = validateSchema(VersaoDigitalCreateSchema, req.body)
  const result = await service.create(parsed);
  return res.status(201).json(result);
}

export async function getVersaoDigitalById(req: Request, res: Response) {
  const {id} = req.params;
  const result = await service.getById(Number(id));
  return res.status(200).json(result);
}

export async function getAllVersoesDigitais(req: Request, res: Response) {
  const result = await service.getAll();
  return res.status(200).json(result);
}

export async function updateVersaoDigital(req: Request, res: Response) {
  const id = Number(req.params.id);
  const parsed = validateSchema(VersaoDigitalUpdateSchema, req.body)
  const result = await service.update(id, parsed);
  return res.status(200).json(result);
}

export async function deleteVersaoDigital(req: Request, res: Response) {
  const id = Number(req.params.id);
  await service.delete(id);
  return res.status(204).send();
}
