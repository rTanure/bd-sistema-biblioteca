import { Request, Response} from "express";
import {UsuarioService} from "./usuario.service"
import { validateSchema, validateId } from "../../utils/validateRequest";
import { UsuarioSchema, UsuarioUpdateSchema} from "./dto/UsuarioCreateDto";

const usuarioService = new UsuarioService;

export async function createUser(req: Request, res: Response) {

    const userData = validateSchema(UsuarioSchema, req.body);
    const userDb = await usuarioService.createUser(userData);
    return res.status(201).json(userDb);
}

export async function getUserById(req: Request, res: Response){

    const {id} = req.params;
    const userId = Number(id);
    const userDb = await usuarioService.getUsuarioById(userId);
    return res.status(200).json(userDb);
}

export async function updateUser(req:Request, res: Response){
    
    const id =  validateId(req);
    const userId = Number(id);
    const userData = validateSchema(UsuarioUpdateSchema, req.body);
    const userUpdated = await usuarioService.updateUsuario(userId, userData);
    return res.status(200).json(userUpdated);
}

export async function deleteUser(req: Request, res:Response){
    const id = validateId(req);
    const userId = Number(id);
    await usuarioService.deleteUsuario(userId);
    return res.status(204).send();
}

