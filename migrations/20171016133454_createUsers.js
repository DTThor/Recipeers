
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table)=>{
    table.increments();
    table.string('name').notNullable();
    table.string('username').notNullable();
    table.string('location');
    table.string('email').notNullable();
    table.string('hashedpass').notNullable();
    table.integer('total_following');
    table.integer('total_followers');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
