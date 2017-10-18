
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_recipes', (table)=>{
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('recipe_id').references('id').inTable('recipes').onDelete('CASCADE').index();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_recipes');
};
