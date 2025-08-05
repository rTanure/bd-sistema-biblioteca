
import corsOptions from './config/corsConfig';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';

const express = require('express');
const  app = express();

app.use(cors(corsOptions));


app.use(express.json());



app.use(errorHandler);
app.listen(3000, () =>{ 
    console.log('Servidor rodando em http://localhost:3000');
});