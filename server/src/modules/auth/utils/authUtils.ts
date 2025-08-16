import { PessoaMapper } from "../dto/mapper/PessoaMapper";
import { LoginResponseDto } from "../dto/LoginResponseDto";
import jwt from "jsonwebtoken";

export function generateLoginResponse(user: any): LoginResponseDto {
  const JWT_SECRET = process.env.JWT_SECRET;
  const EXPIRE_TOKEN = "10m";
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não foi definida no .env");
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: EXPIRE_TOKEN,
  });
  const userResponse = PessoaMapper.toResponseDto(user);

  return {
    token,
    user: userResponse,
  };
}
