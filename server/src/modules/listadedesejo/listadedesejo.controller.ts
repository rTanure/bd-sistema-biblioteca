import { Request, Response } from "express";
import { ListaDeDesejosService } from "./listadedesejo.service";
import { validateSchema, validateId } from "../../utils/validateRequest";
import { ListadedesejoCreateSchema, ListadedesejoUpdateSchema } from './dto/ListadedesejosCreateDto';

const listaService = new ListaDeDesejosService();

export async function createLista(req: Request, res: Response) {
  const data = validateSchema(ListadedesejoCreateSchema, req.body);
  const lista = await listaService.createLista(data);
  return res.status(201).json(lista);
}

export async function getListaById(req: Request, res: Response) {
  const id = validateId(req);
  const lista = await listaService.getListaById(Number(id));
  return res.status(200).json(lista);
}

export async function updateLista(req: Request, res: Response) {
  const id = validateId(req);
  const data = validateSchema(ListadedesejoUpdateSchema, req.body);
  const lista = await listaService.updateLista(Number(id), data);
  return res.status(200).json(lista);
}

export async function deleteLista(req: Request, res: Response) {
  const id = validateId(req);
  await listaService.deleteLista(Number(id));
  return res.status(204).send();
}
