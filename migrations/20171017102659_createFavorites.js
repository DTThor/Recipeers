exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', (table)=>{
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('favorite_recipe_id').references('id').inTable('recipes').onDelete('CASCADE').index();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
