
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', (table)=>{
    table.increments();
    table.string('name').notNullable();
    table.integer('user_id').notNullable();
    table.jsonb('ingredients');
    table.string('instructions', 1000);
    table.integer('upvotes');
    table.boolean('gluten_free');
    table.boolean('dairy_free');
    table.boolean('vegetarian');
    table.boolean('vegan');
    table.boolean('pescatarian');
    table.integer('total_time');
    table.string('blogpost_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes');
};
