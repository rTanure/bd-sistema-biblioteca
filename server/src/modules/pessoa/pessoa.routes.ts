
import {Router, Request, Response} from 'express';
import { getPessoaById, updatePessoa, deletePessoa} from './pessoa.controller'

const router = Router();

router.get("/:id", async (req: Request, res: Response)=>{
    await getPessoaById(req, res);
});

router.put("/:id", async (req: Request, res: Response)=>{
    await updatePessoa(req, res);
});

router.delete("/:id", async (req: Request, res: Response)=>{
    await deletePessoa(req, res);
});

export default router; 