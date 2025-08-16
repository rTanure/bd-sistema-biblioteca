
import corsOptions from './config/corsConfig';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import authRouter from './modules/auth/auth.routes'

const express = require('express');
const  app = express();

app.use(cors(corsOptions));


app.use(express.json());

app.use('/auth', authRouter);
app.use('/usuario', authRouter);

app.use(errorHandler);
app.listen(3001, () =>{ 
    console.log('Servidor rodando em http://localhost:3000');
});