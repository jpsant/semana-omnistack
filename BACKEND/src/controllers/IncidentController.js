const connection = require('../database/connection');

module.exports = {

  async index(request, response) {
    const { page = 1 } = request.query;

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //pegando os dados da ong relacionados a aquele incidente.
      .limit(5)
      .offset((page - 1) * 5)   //criando a lógica de exibir apenas 5 resultados por página.
      .select([
        'incidents.*',  //selecionando todos os elementos da tabela de incidentes.
        'ongs.name',    //selecionando apenas os campos que eu desejo da tabela de ongs.
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    const [count] = await connection('incidents').count()  //acessando a tabela de incidents e obtendo o total de elementos

    response.header('X-Total-Count', count['count(*)'])  //passando o total de casos para o front-end através dos Headers.
    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id })
  },

  async delete(request,response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')  //procure na tabela de incidents
    .where('id', id)  //procurar um ID que seja igual ao id passado
    .select('ong_id') //Selecionando apenas a coluna ong_id
    .first(); //como o id é único retornamos apenas um incidente.

    if (incident.ong_id !== ong_id) { //verificando se o ID passado é o mesmo queid de login
      return response.status(401).json({ error: 'Operation not permitted.'});
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
}