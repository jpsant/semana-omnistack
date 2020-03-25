exports.up = function(knex) { //método resposável pela criação da table
  return knex.schema.createTable('ongs', function (table) {  //criando nossa primeira table.
    table.string('id').primary();       //definimos seus parâmetros.
    table.string('name').notNullable(); //falando que os campos não podem ser nulos.
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();  //passando o parâmetro 2 par adefinir o tamanho da string UF
  });  
};

exports.down = function(knex) { //método responsável para tomar alguma providência caso dê alguma coisa errada
  knex.schema.dropTable('ongs');
};
