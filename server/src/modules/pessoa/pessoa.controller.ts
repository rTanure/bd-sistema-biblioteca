import { Request, Response} from "express";
import { PessoaService } from './pessoa.service';
import { validateSchema, validateId } from "../../utils/validateRequest";
import { PessoaUpdateSchema} from "../auth/dto/PessoaCreateDto";

const pessoaService = new PessoaService;

export async function getPessoaById(req: Request, res: Response){

    const {id} = req.params;
    const pessoaId = Number(id);
    const pessoaDb = await pessoaService.getPessoaById(pessoaId);
    return res.status(200).json(pessoaDb);
}

export async function updatePessoa(req:Request, res: Response){
    
    const id =  validateId(req);
    const userId = Number(id);
    const pessoaData = validateSchema(PessoaUpdateSchema, req.body);
    const userUpdated = await pessoaService.updatePessoa(userId, pessoaData);
    return res.status(200).json(userUpdated);
}

export async function deletePessoa(req: Request, res:Response){
    const id = validateId(req);
    const userId = Number(id);
    await pessoaService.deletePessoa(userId);
    return res.status(204).send();
}
