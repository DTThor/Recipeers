exports.up = function(knex, Promise) {
  return knex.schema.createTable('following', (table)=>{
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('following_user_id').references('id').inTable('users').onDelete('CASCADE').index();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('following');
};
