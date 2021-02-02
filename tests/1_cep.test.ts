import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import app from '../src/app';

chai.use(chaiHttp);
chai.should();

const server = `${process.env.SRV_TST}/v1`;
const endpointBuscaCEP = '/cep';


// Variáveis de teste
const cepInvalidoEmTexto = 'testeTes';
const cepInvalidoNumeroGrande = '1234567890';
const cepInvalidoNumeroPequeno = '123';
const cepInvalidoTextoENumero = '18000test';
const cepValido = '18080720';

describe('Testes do controller CEP', function () {
  this.timeout(500);
  this.slow(100);
  describe('Testes de busca de endereço pelo CEP', () => {
    describe('Verifica ausência e validações de parâmetros obrigatórios', () => {
      it('Detecta CEP em formato não numérico', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepInvalidoEmTexto}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(422);
              (response.body).should.be.equals('CEP inválido');
              done();
            }
          });
      });
      it('Detecta CEP com mais dígitos que o permitido', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepInvalidoNumeroGrande}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(422);
              (response.body).should.be.equals('CEP inválido');
              done();
            }
          });
      });
      it('Detecta CEP com menos dígitos do que o permitido', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepInvalidoNumeroPequeno}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(422);
              (response.body).should.be.equals('CEP inválido');
              done();
            }
          });
      });
      it('Ignora texto no cep e verifica a quantidade de dígitos', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepInvalidoTextoENumero}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(422);
              (response.body).should.be.equals('CEP inválido');
              done();
            }
          });
      });
    });
    describe('Consulta ao CEP retorna com sucesso', function () {
      this.timeout(2000);
      this.slow(200);
      it('Requisição de consulta de CEP válido retorna status 200', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepValido}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(200);
              done();
            }
          });
      });
      it('Requisição de consulta com CEP válido retorna logradouro', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepValido}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(200);
              (response.body).should.have.property('logradouro');
              done();
            }
          });
      });
      it('Requisição de consulta com CEP válido retorna bairro', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepValido}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(200);
              (response.body).should.have.property('bairro');
              done();
            }
          });
      });
      it('Requisição de consulta com CEP válido retorna cidade', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepValido}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(200);
              (response.body).should.have.property('cidade');
              done();
            }
          });
      });
      it('Requisição de consulta com CEP válido retorna estado', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepValido}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(200);
              (response.body).should.have.property('estado');
              done();
            }
          });
      });
      it('Requisição de consulta com CEP válido retorna o CEP buscado', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepValido}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(200);
              (response.body).should.have.property('cep_buscado');
              done();
            }
          });
      });
      it(
        'Requisição de consulta com CEP válido retorna o conteúdo do CEP pequisado ' +
        'está igual conteúdo do body', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepValido}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(200);
              (response.body.cep_buscado).should.be.equals(cepValido);
              done();
            }
          });
      });
      it('Requisição de consulta com CEP válido retorna o CEP encontrado', (done) => {
        chai.request(server)
          .get(`${endpointBuscaCEP}/${cepValido}`)
          .end((err, response) => {
            if (!err) {
              response.should.have.status(200);
              (response.body.cep_localizado).should.be.equals('20000000');
              done();
            }
          });
      });
    });
  });
});

after((done) => {
  try {
    app.close();
    console.log('Aplicação de testes de CEP encerrada com sucesso');
    done();
  } catch (e) {
    console.log(`Houve um erro ao tentar encerrar a execução da aplicação para teste \n[${Date}] - `, e);
    done();
  }
});