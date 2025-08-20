import { Request, Response } from "express";
import { GerenciaService } from "./gerencia.service";
import { validateSchema } from "../../utils/validateRequest";
import { GerenciaCreateSchema, GerenciaUpdateSchema } from "./dto/GerenciaDto";


// export interface Gerencia {
//   id_pessoa: number;
//   id_publicacao: number;
//   data_verificacao: string;
//   observacao: string;
//   descricao: string;
// }

const service = new GerenciaService();

export async function createGerencia(req: Request, res: Response) {
  const data = validateSchema(GerenciaCreateSchema, req.body);
  const result = await service.createGerencia(data);
  return res.status(201).json(result);
}

export async function getGerenciaById(req: Request, res: Response) {
  const { id_pessoa, id_publicacao } = req.params;
  const result = await service.getGerenciaById(Number(id_pessoa), Number(id_publicacao));
  return res.status(200).json(result);
}

export async function getAllGerencias(req: Request, res: Response) {
  const results = await service.getAllGerencias();
  return res.status(200).json(results);
}

export async function updateGerencia(req: Request, res: Response) {
  const { id_pessoa, id_publicacao } = req.params;
  const data = validateSchema(GerenciaUpdateSchema, req.body);
  const result = await service.updateGerencia(Number(id_pessoa), Number(id_publicacao), data);
  return res.status(200).json(result);
}

export async function deleteGerencia(req: Request, res: Response) {
  const { id_pessoa, id_publicacao } = req.params;
  await service.deleteGerencia(Number(id_pessoa), Number(id_publicacao));
  return res.status(204).send();
}
