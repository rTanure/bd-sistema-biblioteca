import { Request, Response} from "express";
import {FuncionarioService} from "./funcionario.service"
import { validateSchema} from "../../utils/validateRequest";
import { FuncionarioSchema, FuncionarioUpdateSchema} from "./dto/FuncionarioCreateDto";

const funcionarioService = new FuncionarioService;

export async function createFuncionario(req: Request, res: Response) {

    const funcionarioData = validateSchema(FuncionarioSchema, req.body);
    const funcionarioDb = await funcionarioService.createFuncionario(funcionarioData);
    return res.status(201).json(funcionarioDb);
}

export async function getFuncionarioById(req: Request, res: Response){

    const {id} = req.params;
    const funcionarioId = Number(id);
    const funcionarioDb = await funcionarioService.getFuncionarioById(funcionarioId);
    return res.status(200).json(funcionarioDb);
}

export async function updateFuncionario(req:Request, res: Response){
    
    const {id} = req.params;
    const funcionarioId = Number(id);
    const funcionarioData = validateSchema(FuncionarioUpdateSchema, req.body);
    const funcionarioUpdated = await funcionarioService.updateFuncionario(funcionarioId, funcionarioData);
    return res.status(200).json(funcionarioUpdated);
}

export async function deleteFuncionario(req: Request, res:Response){
    const {id} = req.params;
    const funcionarioId = Number(id);
    await funcionarioService.deleteFuncionario(funcionarioId);
    return res.status(204).send();
}
