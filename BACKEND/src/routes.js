//CRIAÇÀO DE UM FILE SOMENTE PARA AS ROUTES, EXPORTANDO O MESMO NO FINAL.
const { celebrate, Segments, Joi } = require('celebrate');
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

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  }),
}), sessionController.create);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  }),
}), ongController.create);

routes.get('/ongs', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
}) , ongController.index);

routes.get('/profile', profileController.index);

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
}), incidentController.create);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), incidentController.index);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), incidentController.delete);  //passando o :id para o route.params saber qual incidente ser deletado

module.exports = routes;  //exportando as rotas!