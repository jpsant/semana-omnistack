const express = require('express');
const routes = require('./routes'); //Importando as routes do arquivo de routes.
const { errors } = require('celebrate');
const cors = require('cors');

const app = express();

app.use(cors()) //fazendo o express utilizar o modo de segurança do cors.
app.use(express.json());  //Falando pro express ler files do tipo JSON nas requests.
app.use(routes);  //Fazendo o express utilizar as routes definidas.
app.use(errors());  //utilizando os formato de errors disponibilizado pelo celebrate.

module.exports = app;

/**
 * Para criarmos nossa primeira migration devemos rodar o seguindo código:
 * npx knex migrate:make create_ongs, sendo o create_ongs qualquer nome que você queia escolher.
 */