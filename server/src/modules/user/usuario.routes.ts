
import {Router, Request, Response} from 'express';
import { createUser, getUserById, deleteUser, updateUser} from './usuario.controller';

const router = Router();


router.post("/", async (req: Request, res: Response)=>{
    await createUser(req, res);
});

router.get("/:id", async (req: Request, res: Response)=>{
    await getUserById(req, res);
});

router.put("/:id", async (req: Request, res: Response)=>{
    await updateUser(req, res);
});

router.delete("/:id", async (req: Request, res: Response)=>{
    await deleteUser(req, res);
});