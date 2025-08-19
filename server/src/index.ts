
import corsOptions from './config/corsConfig';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import authRouter from './modules/auth/auth.routes'
import userRouter from './modules/usuario/usuario.routes'

import publicacaoRouter from "./modules/publicacao/publicacao.routes";
import versaoDigitalRouter from "./modules/versaodigital/versaodigital.routes"
import versaoFisicaRouter from "./modules/versaoFisica/versaoFisica.routes"
import doacaoRouter from "./modules/doacao/doacao.routes";
import bibliotecarioRouter from "./modules/bibliotecario/bibliotecario.routes";
import contemRouter from "./modules/contem/contem.routes";
import emprestimoRouter from "./modules/emprestimo/emprestimo.routes";
import exemplarRouter from "./modules/exemplar/exemplar.routes";
import funcionarioRouter from "./modules/funcionario/funcionario.routes";
import gerenciaRouter from "./modules/gerencia/gerencia.routes";
import listaDesejoRouter from "./modules/listadedesejo/listadedesejo.routes";
import pessoaRouter from "./modules/pessoa/pessoa.routes";
import doadorRouter from "./modules/doador/doador.routes";
import orgaoexternoRouter from "./modules/orgaoexterno/orgaoexterno.routes";

const express = require('express');
const  app = express();

app.use(cors(corsOptions));


app.use(express.json());

app.use('/auth', authRouter);
app.use('/usuarios',userRouter);
app.use('/bibliotecarios',bibliotecarioRouter);
app.use('/contem',contemRouter);
app.use('/doacoes',doacaoRouter);
app.use('/emprestimos',emprestimoRouter);
app.use('/exemplares',exemplarRouter);
app.use('/funcionarios',funcionarioRouter);
app.use('/gerencia',gerenciaRouter);
app.use('/lista-de-desejos',listaDesejoRouter );
app.use('/pessoas',pessoaRouter);
app.use('/publicacoes',publicacaoRouter);
app.use('/secretarios',userRouter);
app.use('/digitais',versaoDigitalRouter);
app.use('/fisicos',versaoFisicaRouter);
app.use('/doadores',doadorRouter);
app.use('/orgaoexterno',orgaoexternoRouter);


app.use(errorHandler);
app.listen(3001, () =>{ 
    console.log('Servidor rodando em http://localhost:3000');
});