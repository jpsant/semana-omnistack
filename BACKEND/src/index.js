const express = require('express');
const routes = require('./routes'); //Importando as routes do arquivo de routes.
const cors = require('cors');

const app = express();

app.use(cors()) //fazendo o express utilizar o modo de segurança do cors
app.use(express.json());  //Falando pro express ler files do tipo JSON nas requests
app.use(routes);  //Fazendo o express utilizar as routes definidas.

app.listen(3333);

/**
 * Para criarmos nossa primeira migration devemos rodar o seguindo código:
 * npx knex migrate:make create_ongs, sendo o create_ongs qualquer nome que você queia escolher.
 */