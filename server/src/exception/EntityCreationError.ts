import { BaseError } from './BaseError';

export class EntityCreationError extends BaseError {
  constructor(entityName: string = 'entidade', message?: string) {
    super(
      400, 
      'badRequest.entityCreation',
      message ?? `Erro ao criar ${entityName}`
    );
  }
}