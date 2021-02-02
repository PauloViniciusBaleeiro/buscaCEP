import { Router, Response, Request } from 'express';

class HealthCheck {
  router: Router
  constructor() {
    this.router = Router();
    this.init();
  }

  healthCheckReponse(req:Request, res: Response) {
    return res.send('ok');
  }

  init() {
    this.router.get('/', this.healthCheckReponse);
  }
}

const health = new HealthCheck();
health.init();
export default health.router;
