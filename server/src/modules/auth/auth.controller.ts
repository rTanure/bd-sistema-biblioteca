import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { validateSchema } from "../../utils/validateRequest";
import { PessoaCreateSchema } from "./dto/PessoaCreateDto";


const authService = new AuthService;

export async function login(req: Request, res: Response) {
    const userInfo = req.body ;
    const user = await authService.login(userInfo); 
    return res.status(200).json(user); 
}

export async function register(req: Request, res: Response){
    const userData = validateSchema(PessoaCreateSchema, req.body);
    const userDb = await authService.register(userData)
    return res.status(201).json(userDb);
}


