import { Router } from 'express';
import CEP from '../cep.controller';
import { query, validationResult } from 'express-validator';

const cep = new CEP();

export class CEPRoute {
  router: Router
  constructor() {
    this.router = Router();
    this.init();
  }
  /**
   * Método inicializador das rotas 
   * As rotas referentes ao cadastro estarão listadas aqui
   * A rota raiz 'consulta' se encontra no arquivo index.controller
   * */
  init() {
    this.router.get('/:cep', cep.buscaCEP);
  }
}

// Instanciação, inicialização e exportação da classe
const route = new CEPRoute();
route.init();
export default route.router;
