import { Request, Response } from "express";
import { validateSchema } from "../../utils/validateRequest";
import { OrgaoExternoService } from "./orgaoexterno.service";
import {
  OrgaoExternoCreateSchema,
  OrgaoExternoUpdateSchema
} from "./dto/OrgaoexternoCreateDto";

const service = new OrgaoExternoService();

export async function createOrgaoExterno(req: Request, res: Response) {
  const parsed = validateSchema(OrgaoExternoCreateSchema, req.body);
  const result = await service.create(parsed);
  return res.status(201).json(result);
}

export async function getOrgaoExternoById(req: Request, res: Response) {
  const {id} = req.params;
  const result = await service.getById(Number(id));
  return res.status(200).json(result);
}

export async function updateOrgaoExterno(req: Request, res: Response) {
   const {id} = req.params;
  const parsed = validateSchema(OrgaoExternoUpdateSchema, req.body)
  const result = await service.update(Number(id), parsed);
  return res.status(200).json(result);
}

export async function deleteOrgaoExterno(req: Request, res: Response) {
  const {id} = req.params;
  await service.delete(Number(id));
  return res.status(204).send();
}
