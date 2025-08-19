import { executeQueryMultipleResults, executeQuerySingleResult, executeQueryNoReturn } from "../../database/queries";
import { Publicacao, CREATE_PUBLICACAO, GET_PUBLICACAO_BY_ID, GET_ALL_PUBLICACOES, UPDATE_PUBLICACAO, DELETE_PUBLICACAO, SEARCH_PUBLICACOES_BY_TITULO, SEARCH_PUBLICACOES_BY_AUTOR, GET_PUBLICACOES_BY_GENERO, GET_PUBLICACOES_BY_ANO } from "../../database/publicacao";
import { PublicacaoCreateDto, PublicacaoUpdateDto } from "./dto/PublicacaoCreateDto";
import { PublicacaoResponseDto } from "./dto/PublicacaoResponseDto";
import { PublicacaoMapper } from "./dto/mapper/PublicacaoMapper";
import { EntityCreationError } from "../../exception/EntityCreationError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

export class PublicacaoService {
  async createPublicacao(data: PublicacaoCreateDto): Promise<PublicacaoResponseDto> {
    const pub = await executeQuerySingleResult<Publicacao>(CREATE_PUBLICACAO, [
      data.titulo, data.autor, data.editora, data.ano_publicacao,
      data.edicao, data.numero_paginas, data.genero,
      data.id_pessoa, 
    ]);

    if (!pub) throw new EntityCreationError("publicacao");
    return PublicacaoMapper.toResponseDto(pub);
  }

  async getPublicacaoById(id: number): Promise<PublicacaoResponseDto> {
    const pub = await executeQuerySingleResult<Publicacao>(GET_PUBLICACAO_BY_ID, [id]);
    if (!pub) throw new EntityNotFoundError("Publicacao", id);
    return PublicacaoMapper.toResponseDto(pub);
  }

  async getAllPublicacoes(): Promise<PublicacaoResponseDto[]> {
    const pubs = await executeQueryMultipleResults<Publicacao>(GET_ALL_PUBLICACOES);
    return pubs.map(PublicacaoMapper.toResponseDto);
  }

  async updatePublicacao(id: number, data: PublicacaoUpdateDto): Promise<PublicacaoResponseDto> {
    const dbPub = await executeQuerySingleResult<Publicacao>(GET_PUBLICACAO_BY_ID, [id]);
    if (!dbPub) throw new EntityNotFoundError("Publicacao", id);

    const merged = PublicacaoMapper.atualizarPublicacao(dbPub, data);

   const pub = await executeQuerySingleResult<Publicacao>(UPDATE_PUBLICACAO, [
        id,
        merged.titulo,
        merged.autor,
        merged.editora,
        merged.ano_publicacao,
        merged.edicao,
        merged.numero_paginas,
        merged.genero,
        new Date()
        ]);

    if (!pub) throw new EntityCreationError("publicacao");
    return PublicacaoMapper.toResponseDto(pub);
  }

  async deletePublicacao(id: number): Promise<void> {
    await this.getPublicacaoById(id);
    await executeQueryNoReturn(DELETE_PUBLICACAO, [id]);
  }

  async searchByTitulo(titulo: string): Promise<PublicacaoResponseDto[]> {
    const pubs = await executeQueryMultipleResults<Publicacao>(SEARCH_PUBLICACOES_BY_TITULO, [titulo]);
    return pubs.map(PublicacaoMapper.toResponseDto);
  }

  async searchByAutor(autor: string): Promise<PublicacaoResponseDto[]> {
    const pubs = await executeQueryMultipleResults<Publicacao>(SEARCH_PUBLICACOES_BY_AUTOR, [autor]);
    return pubs.map(PublicacaoMapper.toResponseDto);
  }

  async getByGenero(genero: string): Promise<PublicacaoResponseDto[]> {
    const pubs = await executeQueryMultipleResults<Publicacao>(GET_PUBLICACOES_BY_GENERO, [genero]);
    return pubs.map(PublicacaoMapper.toResponseDto);
  }

  async getByAno(inicio: number, fim: number): Promise<PublicacaoResponseDto[]> {
    const pubs = await executeQueryMultipleResults<Publicacao>(GET_PUBLICACOES_BY_ANO, [inicio, fim]);
    return pubs.map(PublicacaoMapper.toResponseDto);
  }
}
