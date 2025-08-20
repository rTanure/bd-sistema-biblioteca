import { BaseError } from "./BaseError";
export class DatabaseQueryError extends BaseError {
  constructor(
    public readonly query: string,
    public readonly params: unknown[] = [],
    public readonly originalError?: unknown
  ) {
    super(
      500,
      'internal.databaseQuery',
      `Erro ao executar consulta no banco de dados`
    );
  }
}