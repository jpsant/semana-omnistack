//CRIAÇÀO DE UM FILE SOMENTE PARA AS ROUTES, EXPORTANDO O MESMO NO FINAL.

const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

/*
  Tipos de parâmetros:

  Query Params: Parâmetros nomeados enviados na rota após o símbolo de "?" (Filtros, paginação)
    -Parâmetros enviados através do link da request "/users?name=Joao", acessados através do request.query.

  Route Params: Parâmetros utilizados para identificar recursos. "/users/:id"
    -Parâmetros que são recebidos através da route. "/users/:id", acessados através do request.params.

  Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
    -Acessado através de request.body.
*/

/**
 * Bancos de dados!
 * Utilizaremos o banco de dados SQL, mais precisamente o SQLite.
 * Utilizaremos um QueryBuilder para o banco de dados.
 * -npm install knex e npm install sqlite3
 */

routes.post('/sessions', sessionController.create);

routes.post('/ongs', ongController.create);
routes.get('/ongs', ongController.index);

routes.get('/profile', profileController.index);

routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.index);
routes.delete('/incidents/:id', incidentController.delete);  //passando o :id para o route.params saber qual incidente ser deletado

module.exports = routes;  //exportando as rotas!