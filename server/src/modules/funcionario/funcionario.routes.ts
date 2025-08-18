import {Router, Request, Response} from 'express';
import {createFuncionario, getFuncionarioById, updateFuncionario, deleteFuncionario } from './funcionario.controller';

const router = Router();

router.post("/", async (req: Request, res: Response)=>{
    await createFuncionario(req, res);
});

router.get("/:id", async (req: Request, res: Response)=>{
    await getFuncionarioById(req, res);
});

router.put("/:id", async (req: Request, res: Response)=>{
    await updateFuncionario(req, res);
});

router.delete("/:id", async (req: Request, res: Response)=>{
    await deleteFuncionario(req, res);
});

export default router; 