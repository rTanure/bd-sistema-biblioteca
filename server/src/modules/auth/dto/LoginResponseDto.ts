import { PessoaResponseDto } from "./PessoaResponseDto";

export interface LoginResponseDto {
  token: string;
  user: PessoaResponseDto;
}
