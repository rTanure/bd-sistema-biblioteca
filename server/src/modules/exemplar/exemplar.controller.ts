import { Request, Response } from "express";
import { ExemplarService } from "./exemplar.service";
import { ExemplarCreateSchema, ExemplarUpdateSchema } from "./dto/ExemplarDto";
import { validateSchema } from '../../utils/validateRequest';

const exemplarService = new ExemplarService();

export async function createExemplar(req: Request, res: Response) {
  const parsed = validateSchema(ExemplarCreateSchema, req.body);

  const exemplarDb = await exemplarService.create(parsed);
  return res.status(201).json(exemplarDb);
}

export async function getExemplarById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const exemplarDb = await exemplarService.getById(id);
  return res.status(200).json(exemplarDb);
}

export async function getAllExemplares(req: Request, res: Response) {
  const exemplares = await exemplarService.getAll();
  return res.status(200).json(exemplares);
}

export async function getExemplaresEmprestados(req: Request, res: Response) {
  const result = await exemplarService.getEmprestados();
  return res.status(200).json(result);
}

export async function getExemplaresEmAtraso(req: Request, res: Response) {
  const result = await exemplarService.getEmAtraso();
  return res.status(200).json(result);
}

export async function getExemplaresDisponiveisPorPublicacao(req: Request, res: Response) {
  const result = await exemplarService.getDisponiveisPorPublicacao();
  return res.status(200).json(result);
}

export async function updateExemplar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const parsed = validateSchema(ExemplarUpdateSchema, req.body)

  const exemplarUpdated = await exemplarService.update(id, parsed);
  return res.status(200).json(exemplarUpdated);
}

export async function deleteExemplar(req: Request, res: Response) {
  const id = Number(req.params.id);
  await exemplarService.delete(id);
  return res.status(204).send();
}

export async function searchExemplaresByStatus(req: Request, res: Response) {
  const status = req.query.status as string;
  const exemplares = await exemplarService.searchByStatus(status);
  return res.status(200).json(exemplares);
}

export async function getExemplaresByOrigem(req: Request, res: Response) {
  const origem = req.query.origem as string;
  const exemplares = await exemplarService.getByOrigem(origem);
  return res.status(200).json(exemplares);
}

export async function getExemplaresByPublicacao(req: Request, res: Response) {
  const id_publicacao = Number(req.params.id);
  const exemplares = await exemplarService.getByPublicacao(id_publicacao);
  return res.status(200).json(exemplares);
}
