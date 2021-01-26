import express from 'express';
import expressValidator from 'express-validator';
import healthcheck from './controllers/healthcheck.controller';
import controllersV1 from './controllers/v1/index.controller';
import * as swaggerDoc from './swagger.json';
import swaggerUI from 'swagger-ui-express';


// Criação da aplicação
const app = express();

// 
app.use(express.json());

// express validator
app.use(expressValidator());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use('/healthcheck', cors(), healthcheck);
app.use('/v1', controllersV1);

const server = app.listen(process.env.PORT, async () => {
    try {
      null;
    } catch (err) {
      console.log('Oops, ocorreu um erro para se conectar ao Postgre', err);
    }
    console.log('Express server rodando na porta %d', process.env.PORT);
    app.emit(`app_started`);
  });
  
  export default server;

