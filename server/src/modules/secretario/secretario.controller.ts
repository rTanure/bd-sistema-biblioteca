import { Request, Response } from "express";
import { SecretarioService } from "./secretario.service";
import { validateSchema} from "../../utils/validateRequest";
import {SecretarioCreateSchema, SecretarioUpdateSchema} from "./dto/SecretarioCreateDto";

const secretarioService = new SecretarioService();

export async function createSecretario(req: Request, res: Response) {
  console.log("aqui2")
  const data = validateSchema(SecretarioCreateSchema, req.body);
  console.log("Aqui")
  const secretario = await secretarioService.createSecretario(data);
  return res.status(201).json(secretario);
}

export async function getSecretarioById(req: Request, res: Response) {
  const {id} = req.params;
  const secretario = await secretarioService.getSecretarioById(Number(id));
  return res.status(200).json(secretario);
}

export async function updateSecretario(req: Request, res: Response) {
  const {id} = req.params;
  const data = validateSchema(SecretarioUpdateSchema, req.body);
  const secretario = await secretarioService.updateSecretario(Number(id), data);
  return res.status(200).json(secretario);
}

export async function deleteSecretario(req: Request, res: Response) {
  const {id} = req.params;
  await secretarioService.deleteSecretario(Number(id));
  return res.status(204).send();
}
