import { Request, Response } from "express";
import { ContemService } from "./contem.service";
import { validateSchema, validateId } from "../../utils/validateRequest";
import { AddPublicacaoNaListaDto } from "./dto/AddPublicacaoNaListaDto";

const contemService = new ContemService();

export async function addPublicacaoNaLista(req: Request, res: Response) {
  const data = validateSchema(AddPublicacaoNaListaDto, req.body);
  const contem = await contemService.addPublicacaoNaLista(data);
  return res.status(201).json(contem);
}

export async function removePublicacaoDaLista(req: Request, res: Response) {
  const listaId = Number(req.params.listaId);
  const publicacaoId = Number(req.params.publicacaoId);

  await contemService.removePublicacaoDaLista(listaId, publicacaoId);
  return res.status(204).send();
}

export async function listarPublicacoesDaLista(req: Request, res: Response) {
  const listaId = validateId(req);
  const publicacoes = await contemService.listarPublicacoesDaLista(Number(listaId));
  return res.status(200).json(publicacoes);
}

export async function verificarSePublicacaoEstaNaLista(req: Request, res: Response) {
  const listaId = Number(req.params.listaId);
  const publicacaoId = Number(req.params.publicacaoId);

  const exists = await contemService.verificarSePublicacaoEstaNaLista(listaId, publicacaoId);
  return res.status(200).json({ exists });
}
