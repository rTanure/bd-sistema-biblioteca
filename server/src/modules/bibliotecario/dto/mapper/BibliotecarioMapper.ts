import { Bibliotecario } from "../../../../database/bibliotecario";
import { BibliotecarioUpdateDto } from "../BibliotecarioCreateDto";
import { BibliotecarioResponseDto } from "../BibliotecarioResponseDto";
export class BibliotecarioMapper {
  static toResponseDto(bib: Bibliotecario): BibliotecarioResponseDto {
    return {
      id_pessoa: bib.id_pessoa,
      area_especializacao: bib.area_especializacao,
      crb_numero: bib.crb_numero,
      descricao_especializacao: bib.descricao_especializacao,
    };
  }

  static atualizarBibliotecario(
    bibDb: Bibliotecario,
    bibAtualizado: BibliotecarioUpdateDto
  ) {
    return {
      ...bibDb,
      ...bibAtualizado,
    };
  }
}
