
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_recipes').insert([
        {user_id: 1, recipe_id : 1},
        {user_id: 1, recipe_id : 2},
        {user_id: 1, recipe_id : 3},

        {user_id: 3, recipe_id : 4},

        {user_id: 4, recipe_id : 5},
        {user_id: 4, recipe_id : 6},

        {user_id: 5, recipe_id : 7},

        {user_id: 7, recipe_id : 8},
        {user_id: 7, recipe_id : 9},

        {user_id: 9, recipe_id : 10},

        {user_id: 10, recipe_id : 11},
      ]);
    });
};
