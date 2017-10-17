
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {user_id: 1, favorite_recipe_id: 7},
        {user_id: 2, favorite_recipe_id: 11 },
        {user_id: 2, favorite_recipe_id: 10 },
        {user_id: 2, favorite_recipe_id: 9 },
        {user_id: 3, favorite_recipe_id: 11 },
        {user_id: 3, favorite_recipe_id: 1 },
        {user_id: 3, favorite_recipe_id: 3 },
        {user_id: 4, favorite_recipe_id: 1 },
        {user_id: 5, favorite_recipe_id: 2 },
        {user_id: 6, favorite_recipe_id: 1 },
        {user_id: 6, favorite_recipe_id: 8},
        {user_id: 6, favorite_recipe_id: 5 },
        {user_id: 7, favorite_recipe_id: 4 },
        {user_id: 7, favorite_recipe_id: 11 },
        {user_id: 8, favorite_recipe_id: 8 },
        {user_id: 8, favorite_recipe_id: 9 },
        {user_id: 9, favorite_recipe_id: 1 },
        {user_id: 9, favorite_recipe_id: 11 }

      ]);
    });
};
