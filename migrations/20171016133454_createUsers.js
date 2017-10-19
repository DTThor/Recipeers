
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table)=>{
    table.increments();
    table.string('name');
    table.string('username').notNullable().unique();
    table.string('location');
    table.string('email');
    table.string('hashedpass').notNullable();
    table.string('profile_pic_url');
    table.integer('total_following');
    table.integer('total_followers');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
