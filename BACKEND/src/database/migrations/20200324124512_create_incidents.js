exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments();       //definimos seus parâmetros.
    table.string('title').notNullable(); //falando que os campos não podem ser nulos.
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable(); //criação de uma coluna para armazenar o ID da ong desses incidentes.

    table.foreign('ong_id').references('id').inTable('ongs');
    // a conluna 'ong_id' criada acima recefenrica a coluna 'id' dentro da tabela 'ongs'.
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
