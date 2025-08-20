import { ModeloBase } from "./modelo-base";
import type { PessoaCreateDto } from "../../../server/src/modules/auth/dto/PessoaCreateDto";
import type { LoginDto } from "../../../server/src/modules/auth/dto/LoginDto";
import type { LoginResponseDto } from "../../../server/src/modules/auth/dto/LoginResponseDto";

class AuthMdl extends ModeloBase<object, object, object> {
  constructor() {
    super("/auth");
  }

  login = (data: LoginDto) => {
    return this.defaultPostRequest<LoginResponseDto>("/login", data);
  }

  register = (data: PessoaCreateDto) => {
    return this.defaultPostRequest<LoginResponseDto>("/register", data);
  }
}

export const authMdl = new AuthMdl();