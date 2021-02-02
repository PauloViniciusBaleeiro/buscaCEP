import { Request, Response, NextFunction } from 'express';
import CEPS from '../../../ceps/ceps.json';

export default class CEP {
  /**
 * @api {get} /v1/cep/:cep
 * @apiDescription Busca endereço pelo número do CEP
 * @apiGroup CEP
 * @apiName /buscaCEP
 * @apiVersion 1.0.0
 * @apiContentType application/json
 *
 * @apiParam {String} cep             Número do CEP
 * 
 *
 * @apiExample Exemplo de requisição:
 *  
 *  /v1/buscaCEP/18080000
 *
 * @apiSuccess (Sucesso 200) 
 * 
 * @apiSuccessExample Exemplo Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "endereco": {
 *        "logradouro": "Rua do Teste",
 *        "bairro": "Jardim do Teste",
 *        "cidade": "Testelandia",
 *        "estado": "SP",
 *        "cep_buscado": "18999999",
 *        "cep_localizado": "18999000"
 *      }
 *    }
 * 
 *
 * @apiUse Error500
 *
 */
  async buscaCEP(req: Request, res: Response, next: NextFunction) {
    let { cep } = req.params;
    cep = cep.replace('-', '');
    
    if (parseInt(cep).toString().length !== 8) {
      return res.status(422).json('CEP inválido');
    }

    let cepBuscado = cep;
    let result;
    while (cep !== '00000000') {
      try {
        result = CEPS[cep];
      } catch (error) {
        console.log(error);
      }
      if (result) {
        break;
      }
      cep = cep.substring(1, 8).padEnd(8, '0');
    }

    result.cep_localizado = cep;
    result.cep_buscado = cepBuscado;
    return res.json(result);
  }
}

