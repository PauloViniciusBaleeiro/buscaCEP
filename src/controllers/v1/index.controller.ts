import cors from 'cors';
import express from 'express';
import Middleware from '../../middlewares/middleware';
import CEPController from '../cep.controller';

const router = express.Router();
const middleware = new Middleware;

// enable CORS - Cross Origin Resource Sharing
let corsOptionsCliente;
if (process.env.NODE_ENV === 'production') {
  corsOptionsCliente = {
    origin: '*', //buscacep.com.br?
    optionsSuccessStatus: 200
  };
} else {
  corsOptionsCliente = {
    origin: '*',
    optionsSuccessStatus: 200
  };
}

// Rotas
router.use('/cep', [cors(corsOptionsCliente), middleware.checkToken], OrdemServicoRoute);


export default router;
