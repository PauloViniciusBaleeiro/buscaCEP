# buscaCEP
Desafio técnico para LuizaLabs

# Instruções
**Instalando pacotes**

``` $ npm install ```

**Executando os testes**

``` $ npm run test ```

**Iniciando a aplicação**

``` $ npm start ```

**Acessando os endpoints**

Os endpoints estarão disponíveis em localhost:3000

**Acessando a Documentação Swagger**

http://localhost:3000/docs

**Para checar a saúde da aplicação**

http://localhost:3000/healthcheck

**Para buscar o endereço a partir de um cep**

http://localhost:3000/v1/cep/{cep}
{cep} será o número do CEP em formato numérico com 8 dígitos

**Construindo a aplicação (Build)**

``` $ npm run build ```

Ele irá compilar a aplicação e converter de typescript para javascript e disponibilizará a aplicação na pasta 'dist' no diretório raiz da aplicação

# Tecnologias

Fora escolhido a utilização da linguagem Javascript com o Node, em conjunto com a biblioteca express para gerenciar as requisições e NPM como gerenciador de pacotes. Foi adicionado camada em Typescript para obter os benefícios de utilzar um superset para tipagem, benefícios do uso da orientação a objeto e melhor expriência no uso do intellisense da IDE de desenvolvimento escolhida (VSCode).
Essas tecnologias foram escolhidas porque, além da minha maior vivência e experiência no uso cotidiano delas, proporcionam um desenvolvimento ágil, rápido e eficiente. Além de ofertar liberdade para o uso de arquiteturas e padrões definidos pelo desenvolvedor.
Para a arquitetura da aplicação escolhi o modelo com controllers versionados, no qual a há uma pasta que abrigará todos os endpoints e rotas da versão atual a API.
