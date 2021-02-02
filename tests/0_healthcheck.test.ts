import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import app from '../src/app';

chai.use(chaiHttp);
chai.should();

const server = process.env.SRV_TST;

/** 
 * Inicia o servidor
 * Temos duas abrodagens a fazer:
 * 1ª Iniciamos e encerramos o servidor em cada arquivo de teste;
 * 2ª Iniciamos o servidor no primeiro arquivo de testes executado e encerrado no último
 * 
 * Optei pela segunda abordagem, um pouco mais difícil de manter, mas com menos código.
 * A ordem de execução dos arquivos é alfabética.
 * Neste projeto, optarei para ordenar os arquivos com números para controlar a execução
 */
before(function (done) {
  try {
    app.on(`app_started`, function () {
      console.log('aplicação iniciada para execução de testes');
      done();
    })
  } catch (e) {
    console.log(`Ocorreu um erro no inicialização da aplicação para execução de teste`, e);
  } finally {
    done();
  }
});

describe('Teste de healthcheck', function () {
  this.timeout(1000);
  this.slow(200);
  describe(`Verifica retorno adequado de endereço não encontrado`, () => {
    it(`Deve retornar 404 para endereço não existente`, (done) => {
      chai.request(server)
        .get(`/cadeirasemesas`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
  describe(`Verifica se o healthcheck está ok e recebendo requisições`, () => {
    it(`Deve retornar um 'ok' em plain text`, (done) => {
      chai.request(server)
        .get(`/healthcheck`)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.html;
          response.text.should.be.equal(`ok`);
          done();
        });
    });
  });
});

after(done => {
  try {
    app.close();
    console.log('Aplicação de testes de HEALTHCHECK encerrada com sucesso');
    done();
  } catch (e) {
    console.log(`Houve um erro ao tentar encerrar a execução da aplicação para teste \n[${Date}] - `, e);
    done();
  }
});