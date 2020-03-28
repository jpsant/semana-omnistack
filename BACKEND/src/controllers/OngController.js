const connection = require('../database/connection'); //CONEXÃO COM O BANCO DE DADOS.
const generateUniqueId = require('../utils/generateUniqueId');
//AQUI FICARÃO TODAS AS LÓGICAS DAS ROUTES RELACIONADAS AS ONGS.

module.exports = {

  async index(request, response){
    const ongs = await connection('ongs').select('*');
  
    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    
    const id = generateUniqueId();
  
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });
  
    return response.json({ id });
  }
}