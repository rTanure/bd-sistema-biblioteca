import { Request, Response } from "express";
import { BibliotecarioService } from "./bibliotecario.service";
import { validateSchema, validateId } from "../../utils/validateRequest";
import {
  BibliotecarioSchema,
  BibliotecarioUpdateSchema,
} from "./dto/BibliotecarioCreateDto";

const bibliotecarioService = new BibliotecarioService();

export async function createBibliotecario(req: Request, res: Response) {
  const data = validateSchema(BibliotecarioSchema, req.body);
  const result = await bibliotecarioService.createBibliotecario(data);
  return res.status(201).json(result);
}

export async function getBibliotecarioById(req: Request, res: Response) {
  const {id} = req.params;
  const result = await bibliotecarioService.getBibliotecarioById(Number(id));
  return res.status(200).json(result);
}

export async function updateBibliotecario(req: Request, res: Response) {
  const {id} = req.params;
  const data = validateSchema(BibliotecarioUpdateSchema, req.body);
  const result = await bibliotecarioService.updateBibliotecario(Number(id), data);
  return res.status(200).json(result);
}

export async function deleteBibliotecario(req: Request, res: Response) {
  const {id} = req.params;
  await bibliotecarioService.deleteBibliotecario(Number(id));
  return res.status(204).send();
}
