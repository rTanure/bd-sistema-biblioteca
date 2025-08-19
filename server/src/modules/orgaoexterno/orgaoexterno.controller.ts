import { Request, Response } from "express";
import { OrgaoExternoService } from "./orgaoexterno.service";
import {
  OrgaoExternoCreateSchema,
  OrgaoExternoUpdateSchema
} from "./dto/OrgaoexternoCreateDto";

const service = new OrgaoExternoService();

export async function createOrgaoExterno(req: Request, res: Response) {
  const parsed = OrgaoExternoCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const result = await service.create(parsed.data);
  return res.status(201).json(result);
}

export async function getOrgaoExternoById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = await service.getById(id);
  return res.status(200).json(result);
}

export async function updateOrgaoExterno(req: Request, res: Response) {
  const id = Number(req.params.id);
  const parsed = OrgaoExternoUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const result = await service.update(id, parsed.data);
  return res.status(200).json(result);
}

export async function deleteOrgaoExterno(req: Request, res: Response) {
  const id = Number(req.params.id);
  await service.delete(id);
  return res.status(204).send();
}
