import { OrgaoExterno } from "../../../../database/orgao_externo";
import { OrgaoExternoResponseDto, OrgaoExternoUpdateDto } from "../OrgaoexternoCreateDto";


export class OrgaoExternoMapper {
  static toResponseDto(orgao: OrgaoExterno): OrgaoExternoResponseDto {
    return {
      idOrgao: orgao.idOrgao,
      nomeOficial: orgao.nomeOficial,
      cnpj: orgao.cnpj,
      responsavel: orgao.responsavel,
      email: orgao.email,
      telefone: orgao.telefone,
    };
  }

  static atualizarOrgao(db: OrgaoExterno, updated: OrgaoExternoUpdateDto): OrgaoExterno {
    return { ...db, ...updated };
  }
}
