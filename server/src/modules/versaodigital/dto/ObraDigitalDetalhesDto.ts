export interface ObraDigitalDetalhesDto {
  id_versao_digital: number;
  formato_arquivo: string;
  url_acesso: string;
  exemplar: {
    id_exemplar: number;
    status: string;
    publicacao: {
      id_publicacao: number;
      titulo: string;
      autor: string;
      editora: string;
      ano_publicacao: number;
    };
  };
}
