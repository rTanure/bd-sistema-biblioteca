import { Request, Response } from "express";
import { PublicacaoService } from "./publicacao.service";
import { validateSchema, validateId } from "../../utils/validateRequest";
import { PublicacaoCreateSchema, PublicacaoUpdateSchema } from "./dto/PublicacaoCreateDto";

const service = new PublicacaoService();

export async function createPublicacao(req: Request, res: Response) {
  const data = validateSchema(PublicacaoCreateSchema, req.body);
  const pub = await service.createPublicacao(data);
  return res.status(201).json(pub);
}

export async function getPublicacaoById(req: Request, res: Response) {
  const {id} = req.params;
  const pub = await service.getPublicacaoById(Number(id));
  return res.status(200).json(pub);
}

export async function getAllPublicacoes(req: Request, res: Response) {
  const pubs = await service.getAllPublicacoes();
  return res.status(200).json(pubs);
}

export async function updatePublicacao(req: Request, res: Response) {
  const {id} = req.params;
  const data = validateSchema(PublicacaoUpdateSchema, req.body);
  const pub = await service.updatePublicacao(Number(id), data);
  return res.status(200).json(pub);
}

export async function deletePublicacao(req: Request, res: Response) {
  
  const {id} = req.params;
  await service.deletePublicacao(Number(id));
  return res.status(204).send();
}

export async function searchPublicacoesByTitulo(req: Request, res: Response) {
  const { titulo } = req.query;
  const pubs = await service.searchByTitulo(String(titulo));
  return res.status(200).json(pubs);
}

export async function searchPublicacoesByAutor(req: Request, res: Response) {
  const { autor } = req.query;
  const pubs = await service.searchByAutor(String(autor));
  return res.status(200).json(pubs);
}

export async function getPublicacoesByGenero(req: Request, res: Response) {
  const { genero } = req.query;
  const pubs = await service.getByGenero(String(genero));
  return res.status(200).json(pubs);
}

export async function getPublicacoesByAno(req: Request, res: Response) {
  const { inicio, fim } = req.query;
  const pubs = await service.getByAno(Number(inicio), Number(fim));
  return res.status(200).json(pubs);
}
